

import { prisma } from '@/lib/prisma';
import AdminProductsClient from "@/features/admin/products/AdminProductsClient";


export default async function AdminProductsPage() {

    return <AdminProductsClient />;
}