// features/admin/types/admin.ts
import { Prisma } from '@prisma/client';

// ==================== ТОВАРЫ ====================
export type AdminProduct = Prisma.ProductGetPayload<{
    include: {
        category: { select: { id: true; name: true } };
        brand: { select: { id: true; name: true } };
    };
}>;

// ==================== ЗАКАЗЫ ====================

// Более надёжный способ для OrderItem
export type AdminOrderItem = Prisma.OrderItemGetPayload<{
    include: {
        product: {
            select: {
                id: true;
                article: true;
                name: true;
                images: true;
            };
        };
    };
}>;

// Основной тип заказа
export type AdminOrder = Prisma.OrderGetPayload<{
    include: {
        items: {
            include: {
                product: {
                    select: {
                        id: true;
                        article: true;
                        name: true;
                        images: true;
                    };
                };
            };
        };
        user: {
            select: {
                id: true;
                name: true;
                email: true;
            };
        };
    };
}>;