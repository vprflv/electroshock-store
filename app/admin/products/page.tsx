

import { prisma } from '@/lib/prisma';
import AdminProductsClient from "@/features/admin/products/AdminProductsClient";


export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: { select: { name: true } },
            brand: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return <AdminProductsClient initialProducts={products} />;
}