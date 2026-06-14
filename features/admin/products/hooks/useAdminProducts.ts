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
    const deleteProduct = async (id: number, name: string) => {
        toast.error(`Удалить товар "${name}"?`, {
            description: "Это действие нельзя отменить",
            action: {
                label: "Да, удалить",
                onClick: async () => {
                    try {
                        const res = await fetch(`/api/admin/products/${id}`, {
                            method: 'DELETE'
                        });

                        const data = await res.json();

                        if (res.status === 409) {
                            let message = data.message + '\n\n';
                            if (data.orders && data.orders.length > 0) {
                                message += 'Заказы:\n';
                                data.orders.forEach((o: any) => {
                                    message += `• #${o.orderNumber} (${o.status}) от ${o.date}\n`;
                                });
                            }
                            toast.error(message, { duration: 8000 });
                            return;
                        }

                        if (!res.ok) throw new Error();

                        toast.success(`Товар "${name}" успешно удалён`);
                        // invalidate queries / refetch...

                    } catch (err) {
                        toast.error('Не удалось удалить товар');
                    }
                },
            },
            cancel: {
                label: "Отмена",
                onClick: () => console.log("отмена"),
            },
            duration: 7000,
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