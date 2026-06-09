// types/admin.ts
import { Prisma } from '@prisma/client';

export type AdminProduct = Prisma.ProductGetPayload<{
    include: {
        category: { select: { name: true } };
        brand: { select: { name: true } };
    };
}>;