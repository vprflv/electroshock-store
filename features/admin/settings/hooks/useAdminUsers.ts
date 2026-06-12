'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateAdminInput } from '../schemas/userSchema';

async function getAdminUsers() {
    const res = await fetch('/api/admin/users');
    if (!res.ok) throw new Error('Не удалось загрузить пользователей');
    return res.json();
}

async function createAdminUser(data: CreateAdminInput) {
    const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Не удалось создать администратора');
    }
    return res.json();
}

async function deleteAdminUser(id: string) {
    const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Не удалось удалить пользователя');
    }
    return res.json();
}

export function useAdminUsers() {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['adminUsers'],
        queryFn: getAdminUsers,
    });

    const createMutation = useMutation({
        mutationFn: createAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            toast.success('Администратор успешно создан');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Ошибка создания');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            toast.success('Пользователь успешно удалён');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Не удалось удалить пользователя');
        },
    });

    return {
        users: usersQuery.data || [],
        isLoading: usersQuery.isLoading,
        createAdmin: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        deleteUser: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
}