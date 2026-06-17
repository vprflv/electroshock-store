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
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);

        if (isNaN(productId)) {
            return NextResponse.json({ message: 'Неверный ID товара' }, { status: 400 });
        }

        // Проверяем, есть ли товар в заказах
        const orderItemsCount = await prisma.orderItem.count({
            where: { productId }
        });

        if (orderItemsCount > 0) {
            return NextResponse.json({
                message: `Невозможно удалить товар. Он используется в ${orderItemsCount} заказе(ах). Сначала удалите заказы или отмените позиции с этим товаром.`
            }, { status: 409 });
        }

        // Удаляем товар
        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
            select: { name: true, article: true }
        });

        return NextResponse.json({
            message: `Товар "${deletedProduct.name}" (${deletedProduct.article}) успешно удалён`
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Ошибка при удалении товара'
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