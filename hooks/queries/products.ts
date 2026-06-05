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

// Поиск товаров
export const useSearchProducts = (searchTerm: string) => {
    return useQuery({
        queryKey: ['searchProducts', searchTerm],
        queryFn: () => searchProducts(searchTerm),
        enabled: searchTerm.trim().length > 1,
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
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