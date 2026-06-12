import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [totalProducts, inStockProducts, ordersToday, activeBrands] = await Promise.all([
            prisma.product.count(),

            prisma.product.count({
                where: { stock: { gt: 0 } },
            }),

            prisma.order.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),

            prisma.brand.count({
                where: {
                    products: { some: {} },
                },
            }),
        ]);

        return NextResponse.json({
            totalProducts,
            inStockProducts,
            ordersToday,
            activeBrands,
        });
    } catch (error) {
        console.error('Failed to fetch admin stats:', error);
        return NextResponse.json(
            { error: 'Не удалось загрузить статистику' },
            { status: 500 }
        );
    }
}