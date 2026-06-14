'use client';

import { useQuery } from '@tanstack/react-query';
import { AdminStats } from '@/features/admin/types/admin';

async function fetchAdminStats(): Promise<AdminStats> {
    const res = await fetch('/api/admin/stats', {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 60 }, // обновление каждые 60 секунд
    });

    if (!res.ok) {
        throw new Error('Не удалось загрузить статистику');
    }

    return res.json();
}

export function useAdminStats() {
    return useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: fetchAdminStats,
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 45,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}