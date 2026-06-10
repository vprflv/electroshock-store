'use client';

import { useState, useEffect, useCallback } from 'react';

export function useBrands() {
    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Основная функция обновления
    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/admin/brands');

            if (!res.ok) {
                throw new Error('Не удалось загрузить бренды');
            }

            const data = await res.json();
            setBrands(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ошибка загрузки брендов');
            setBrands([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Загрузка при первом рендере
    useEffect(() => {
        refetch();
    }, [refetch]);

    const addBrand = (newBrand: { id: string; name: string }) => {
        setBrands(prev => [...prev, newBrand]);
    };

    return {
        brands,
        loading,
        error,
        addBrand,
        refetch,
    };
}