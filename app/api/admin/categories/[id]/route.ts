// app/api/admin/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const productsCount = await prisma.product.count({
            where: { categoryId: id }
        });

        if (productsCount > 0) {
            return NextResponse.json({
                error: `Нельзя удалить категорию. В ней находится ${productsCount} товар${productsCount > 1 ? 'ов' : ''}.`,
                count: productsCount
            }, { status: 400 });
        }

        await prisma.category.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Произошла ошибка при удалении категории'
        }, { status: 500 });
    }
}