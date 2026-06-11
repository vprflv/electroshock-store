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

    // Основной запрос
    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['adminProducts'],
        queryFn: getAllProductsForAdmin,
        staleTime: 2 * 60 * 1000,     // 2 минуты
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // Мутация удаления
    const deleteMutation = useMutation({
        mutationFn: async ({ id, name }: { id: number; name: string }) => {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const error = await res.json().catch(() => ({}));
                throw new Error(error.error || 'Не удалось удалить товар');
            }

            return { id, name };
        },
        onSuccess: async ({ id, name }) => {
            // Оптимистическое обновление кэша
            queryClient.setQueryData(['adminProducts'], (old: AdminProduct[] | undefined) =>
                old?.filter(p => p.id !== id) || []
            );

            await revalidateAllProducts();

            toast.success(`Товар "${name}" успешно удалён`);
        },
        onError: (err: any) => {
            toast.error(err.message || 'Ошибка при удалении товара');
        },
    });

    return {
        products,
        isLoading,
        isError,
        deletingId: deleteMutation.variables?.id ?? null,
        deleteProduct: (id: number, name: string) => deleteMutation.mutate({ id, name }),
        isDeleting: deleteMutation.isPending,
    };
}