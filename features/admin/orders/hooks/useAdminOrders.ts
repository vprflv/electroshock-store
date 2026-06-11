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

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: getAllOrdersForAdmin,
        staleTime: 60 * 1000,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: AdminOrder['status'] }) =>
            updateOrderStatus(id, status),

        onMutate: async ({ id, status }) => {
            await queryClient.cancelQueries({ queryKey: ['adminOrders'] });
            const previousOrders = queryClient.getQueryData<AdminOrder[]>(['adminOrders']);

            queryClient.setQueryData<AdminOrder[]>(['adminOrders'], (old = []) =>
                old.map(order => order.id === id ? { ...order, status } : order)
            );

            return { previousOrders };
        },

        onError: (err, _, context) => {
            if (context?.previousOrders) {
                queryClient.setQueryData(['adminOrders'], context.previousOrders);
            }
            toast.error('Не удалось обновить статус');
        },

        onSuccess: () => toast.success('Статус заказа обновлён'),
    });

    return {
        orders,
        isLoading,
        updateOrderStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
}