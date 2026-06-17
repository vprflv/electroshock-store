// app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'ID заказа не передан' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            select: { id: true, orderNumber: true }
        });

        if (!order) {
            return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 });
        }

        await prisma.order.delete({
            where: { id },
        });

        revalidatePath('/admin/orders');

        return NextResponse.json({
            success: true,
            message: `Заказ #${order.orderNumber} успешно удалён`
        });

    } catch (error: any) {
        console.error('Delete order error:', error);
        return NextResponse.json({ error: 'Ошибка при удалении заказа' }, { status: 500 });
    }
}