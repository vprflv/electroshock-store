// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateAllProducts } from '@/features/actions/productActions';
import {createServerSupabase} from "@/lib/supabase";



export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: { select: { id: true, name: true } },
                brand: { select: { id: true, name: true } },
            },
        });

        if (!product) return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}




export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        const supabase = await createServerSupabase();
        const BUCKET_NAME = 'product-images';

        // 1. Получаем товар и его изображения
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: {
                name: true,
                imagePaths: true
            }
        });

        if (!product) {
            return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
        }

        // 2. Удаляем файлы из Supabase Storage
        if (product.imagePaths && product.imagePaths.length > 0) {
            const { error: storageError } = await supabase.storage
                .from(BUCKET_NAME)
                .remove(product.imagePaths);

            if (storageError) {
                console.error('Storage delete error:', storageError);
                // Не прерываем удаление товара, если storage упал
            } else {
                console.log(`🗑 Удалено ${product.imagePaths.length} изображений для товара ${product.name}`);
            }
        }

        // 3. Удаляем товар из базы
        await prisma.product.delete({ where: { id: productId } });

        await revalidateAllProducts();

        return NextResponse.json({
            success: true,
            message: `Товар "${product.name}" и его изображения успешно удалены`
        });

    } catch (error: any) {
        console.error('Delete product error:', error);
        return NextResponse.json({
            error: error.message || 'Ошибка при удалении товара'
        }, { status: 500 });
    }
}




export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        const formData = await request.formData();

        const name = formData.get('name') as string;
        const article = formData.get('article') as string;
        const price = parseInt(formData.get('price') as string);
        const oldPriceStr = formData.get('oldPrice') as string | null;
        const stock = parseInt(formData.get('stock') as string);
        const description = formData.get('description') as string;
        const categoryId = formData.get('categoryId') as string;
        const brandId = formData.get('brandId') as string;
        const specsJson = formData.get('specs') as string | null;

        const newFiles = formData.getAll('images') as File[];
        const remainingImagePathsJson = formData.get('remainingImagePaths') as string | null;
        const remainingImagePaths = remainingImagePathsJson
            ? JSON.parse(remainingImagePathsJson) as string[]
            : [];

        const supabase = await createServerSupabase();
        const BUCKET_NAME = 'product-images';

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
            select: { images: true, imagePaths: true, specs: true }
        });

        if (!existingProduct) {
            return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
        }

        // === УДАЛЕНИЕ ИЗОБРАЖЕНИЙ ===
        const imagesToDelete = existingProduct.imagePaths?.filter(
            path => !remainingImagePaths.includes(path)
        ) || [];

        // Удаляем файлы из Supabase Storage
        for (const fileName of imagesToDelete) {
            await supabase.storage
                .from(BUCKET_NAME)
                .remove([fileName]);
        }

        // === ЗАГРУЗКА НОВЫХ ИЗОБРАЖЕНИЙ ===
        const newImagePaths: string[] = [];
        const newImageUrls: string[] = [];

        console.log('Received newFiles count:', newFiles.length);

        for (const file of newFiles) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

            const { error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(fileName, file, { cacheControl: '3600', upsert: false });

            if (error) throw error;

            newImagePaths.push(fileName);

            const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
            newImageUrls.push(data.publicUrl);
        }

        // Финальные массивы
        const finalImagePaths = [...remainingImagePaths, ...newImagePaths];
        const finalImages = [
            ...remainingImagePaths.map(path => {
                const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
                return data.publicUrl;
            }),
            ...newImageUrls
        ];

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name, article, price,
                oldPrice: oldPriceStr ? parseInt(oldPriceStr) : null,
                stock,
                description,
                categoryId,
                brandId,
                specs: specsJson ? JSON.parse(specsJson) : existingProduct.specs,
                images: finalImages,
                imagePaths: finalImagePaths,
            },
        });

        await revalidateAllProducts();

        return NextResponse.json({
            success: true,
            message: 'Товар успешно обновлён',
            product: updatedProduct
        });

    } catch (error: any) {
        console.error('Update product error:', error);
        return NextResponse.json({ error: error.message || 'Ошибка обновления' }, { status: 500 });
    }
}