// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateAllProducts } from '@/features/actions/productActions';



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

        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { name: true }
        });

        if (!product) {
            return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
        }

        await prisma.product.delete({ where: { id: productId } });

        await revalidateAllProducts();

        return NextResponse.json({
            success: true,
            message: `Товар "${product.name}" удалён`
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Ошибка удаления товара' }, { status: 500 });
    }
}

// ==================== PUT - Обновление товара ====================
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

        const newImages = formData.getAll('images') as File[];

        // Проверяем существование товара
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                article,
                price,
                oldPrice: oldPriceStr ? parseInt(oldPriceStr) : null,
                stock,
                description,
                categoryId,
                brandId,
                specs: specsJson ? JSON.parse(specsJson) : existingProduct.specs,
                // images и imagePaths пока оставляем как есть (доработаем позже)
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
        return NextResponse.json({
            error: error.message || 'Ошибка при обновлении товара'
        }, { status: 500 });
    }
}