// features/admin/products/hooks/useAdminProducts.ts
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AdminProduct } from "@/features/admin/types/admin";
import {revalidateAllProducts} from "@/features/actions/productActions";

export function useAdminProducts(initialProducts: AdminProduct[]) {
    const [data, setData] = useState<AdminProduct[]>(initialProducts);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Удалить товар "${name}"?`)) return;

        setDeletingId(id);

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Не удалось удалить товар');
            }

            setData(prev => prev.filter(p => p.id !== id));

            await revalidateAllProducts();

            toast.success(`Товар "${name}" успешно удалён`);
        } catch (err: any) {
            toast.error(err.message || 'Ошибка при удалении товара');
        } finally {
            setDeletingId(null);
        }
    };

    return {
        data,
        setData,
        deletingId,
        handleDelete,
    };
}