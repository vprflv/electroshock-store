import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        const orderItems = await prisma.orderItem.findMany({
            where: { productId },
            include: {
                order: {
                    select: {
                        id: true,
                        orderNumber: true,
                        createdAt: true,
                        status: true,
                    }
                }
            }
        });

        if (orderItems.length > 0) {
            const ordersInfo = orderItems.map(item => ({
                orderNumber: item.order.orderNumber,
                status: item.order.status,
                date: item.order.createdAt.toLocaleDateString('ru-RU')
            }));

            return NextResponse.json({
                message: `Невозможно удалить товар. Он присутствует в ${orderItems.length} заказе(ах).`,
                orders: ordersInfo
            }, { status: 409 });
        }

        // Если товар нигде не используется — удаляем
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