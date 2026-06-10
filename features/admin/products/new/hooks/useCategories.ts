'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCategories() {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Основная функция загрузки
    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/admin/categories');

            if (!res.ok) {
                throw new Error('Не удалось загрузить категории');
            }

            const data = await res.json();
            setCategories(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ошибка загрузки категорий');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        refetch();
    }, [refetch]);

    // Добавление новой категории (локально + можно сделать с refetch при необходимости)
    const addCategory = (newCat: { id: string; name: string }) => {
        setCategories(prev => [...prev, newCat]);
    };

    return {
        categories,
        loading,
        error,
        addCategory,
        refetch,
    };
}