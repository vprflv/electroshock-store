import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            fullName,
            phone,
            address,
            comment = '',
            items,
            total
        } = body;

        if (!fullName || !phone || !items?.length) {
            return NextResponse.json({ error: 'Недостаточно данных' }, { status: 400 });
        }

        // Генерируем номер заказа (например: ES-20250611-0042)
        const date = new Date();
        const orderNumber = `ES-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName: fullName,
                customerPhone: phone,
                customerAddress: address || 'Самовывоз',
                customerComment: comment,
                total,
                status: 'PENDING',

                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        priceAtTime: item.priceAtTime,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        revalidatePath('/admin/orders');

        return NextResponse.json({
            success: true,
            orderNumber: order.orderNumber,
            orderId: order.id,
        });

    } catch (error: any) {
        console.error('Create order error:', error);
        return NextResponse.json({
            error: 'Ошибка при создании заказа'
        }, { status: 500 });
    }
}