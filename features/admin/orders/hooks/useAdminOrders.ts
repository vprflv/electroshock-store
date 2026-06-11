'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
    getAllOrdersForAdmin,
    updateOrderStatus,
} from "@/features/actions/productActions";
import { AdminOrder } from "@/features/admin/types/admin";

export function useAdminOrders() {
    const queryClient = useQueryClient();

    const {
        data: orders = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: getAllOrdersForAdmin,
        staleTime: 60 * 1000, // 1 минута
        gcTime: 10 * 60 * 1000,
    });

    // Мутация смены статуса
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: AdminOrder['status'] }) =>
            updateOrderStatus(id, status),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
            toast.success('Статус заказа обновлён');
        },

        onError: (err: any) => {
            toast.error('Не удалось обновить статус', {
                description: err.message || 'Попробуйте ещё раз',
            });
        },
    });

    return {
        orders,
        isLoading,
        isError,
        updateOrderStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
}