'use client';

import { useState, useEffect } from 'react';

export function useCategories() {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .finally(() => setLoading(false));
    }, []);

    const addCategory = (newCat: { id: string; name: string }) => {
        setCategories(prev => [...prev, newCat]);
    };

    return { categories, addCategory, loading };
}