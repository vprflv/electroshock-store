'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@/features/actions/productActions';

export function usePrefetchProducts(products: any[]) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!products || products.length === 0) return;

        // Небольшая задержка, чтобы не мешать основной отрисовке страницы
        const timeout = setTimeout(() => {
            products.forEach((product) => {
                if (product?.id) {
                    queryClient.prefetchQuery({
                        queryKey: ['product', product.id],
                        queryFn: () => getProductById(product.id),
                        staleTime: 5 * 60 * 1000,     // 5 минут
                        gcTime: 10 * 60 * 1000,       // 10 минут в памяти
                    });
                }
            });
        }, 600);

        return () => clearTimeout(timeout);
    }, [products, queryClient]);
}