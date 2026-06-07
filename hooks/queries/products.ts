'use client';

import { useQuery } from '@tanstack/react-query';
import {
    getAllLightProducts,
    getBrands,
    getCategories,
    getProductById,
    searchProducts
} from "@/features/actions/productActions";



export const useAllLightProducts = () => {
    return useQuery({
        queryKey: ['allLightProducts'],
        queryFn: getAllLightProducts,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};

// Полный товар для детальной страницы
export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,      // 10 минут
        gcTime: 30 * 60 * 1000,
    });
};

export const useSearchProducts = (searchTerm: string) => {
    const { data: allProducts = [] } = useAllLightProducts();

    return useQuery({
        queryKey: ['searchProducts', searchTerm],
        queryFn: async () => {
            if (!searchTerm?.trim()) return [];

            const term = searchTerm.toLowerCase().trim();

            return allProducts
                .filter((p: any) =>
                    p.name?.toLowerCase().includes(term) ||
                    p.article?.toLowerCase().includes(term)
                )
                .slice(0, 30);
        },
        enabled: searchTerm.trim().length > 1,
        staleTime: 60 * 1000,
    });
};


// Для фильтров (категории и бренды)
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: getBrands,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};