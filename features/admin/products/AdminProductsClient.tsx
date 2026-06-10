// app/admin/products/AdminProductsClient.tsx
import AdminProductsTable from '@/features/admin/products/components/AdminProductsTable';
import { AdminProduct } from "@/features/admin/types/admin";

export default function AdminProductsClient({
                                                initialProducts
                                            }: {
    initialProducts: AdminProduct[]
}) {
    return <AdminProductsTable initialProducts={initialProducts} />;
}