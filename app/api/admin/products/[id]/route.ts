// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;


        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            select: { id: true, name: true }
        });

        if (!product) {
            return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
        }

        // Удаляем товар
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({
            success: true,
            message: `Товар "${product.name}" успешно удалён`
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Ошибка при удалении товара'
        }, { status: 500 });
    }
}