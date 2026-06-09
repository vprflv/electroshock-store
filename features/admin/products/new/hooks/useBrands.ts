'use client';

import { useState, useEffect } from 'react';

export function useBrands() {
    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/brands')
            .then(r => r.json())
            .then(setBrands)
            .finally(() => setLoading(false));
    }, []);

    const addBrand = (newBrand: { id: string; name: string }) => {
        setBrands(prev => [...prev, newBrand]);
    };

    return { brands, addBrand, loading };
}