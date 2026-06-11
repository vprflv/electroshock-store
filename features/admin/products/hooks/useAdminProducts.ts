// features/admin/products/hooks/useAdminProducts.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
    getAllProductsForAdmin,
    revalidateAllProducts,
} from "@/features/actions/productActions";
import { AdminProduct } from "@/features/admin/types/admin";

export function useAdminProducts() {
    const queryClient = useQueryClient();

    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['adminProducts'],
        queryFn: getAllProductsForAdmin,
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // Мутация удаления с красивым подтверждением
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || 'Не удалось удалить товар');
            }
            return id;
        },
        onSuccess: async (id) => {
            // Оптимистическое обновление
            queryClient.setQueryData(['adminProducts'], (old: AdminProduct[] | undefined) =>
                old?.filter(p => p.id !== id) || []
            );

            await revalidateAllProducts();
            toast.success('Товар успешно удалён');
        },
        onError: (err: any) => {
            toast.error(err.message || 'Ошибка при удалении товара');
        },
    });

    // Функция с подтверждением через toast
    const deleteProduct = (id: number, name: string) => {
        toast.warning(`Вы уверены, что хотите удалить товар "${name}"?`, {
            description: "Это действие нельзя отменить",
            action: {
                label: "Да, удалить",
                onClick: () => deleteMutation.mutate(id),
            },
            cancel: {
                label: "Отмена",
                onClick: () => {},
            },
            duration: 6000, // даём время на размышление
        });
    };

    return {
        products,
        isLoading,
        isError,
        deletingId: deleteMutation.variables ?? null,
        deleteProduct,
        isDeleting: deleteMutation.isPending,
    };
}