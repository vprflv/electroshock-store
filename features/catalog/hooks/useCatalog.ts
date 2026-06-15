'use client';

import { useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import {
    useAllLightProducts,
    useSearchProducts,
    useCategories,
    useBrands
} from '@/hooks/queries/products';

import { useCatalogFilters } from './useCatalogFilters';
import { usePrefetchProducts } from './usePrefetchProducts';
import { useCatalogPagination } from './useCatalogPagination';

type UseCatalogProps = {
    searchTerm: string;
};


export function useCatalog({ searchTerm }: UseCatalogProps) {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    console.log(`[useCatalog] Рендер | currentPage из URL = ${currentPage} | searchTerm = "${searchTerm}"`);

    const { goToPage } = useCatalogPagination();

    // Запросы данных
    const { data: allProducts = [] } = useAllLightProducts();
    const { data: searchedProducts = [], isLoading: productsLoading } = useSearchProducts(searchTerm);
    const { data: categories = [] } = useCategories();
    const { data: brands = [] } = useBrands();

    const productsAfterSearch = searchTerm.trim() ? searchedProducts : allProducts;

    const filters = useCatalogFilters({
        productsToShow: productsAfterSearch,
        availableCategories: categories,
        availableBrands: brands,
    });

    const itemsPerPage = 9;

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const result = filters.filteredProducts.slice(start, start + itemsPerPage);
        console.log(`[useCatalog] Пагинация: страница ${currentPage}, товаров на странице: ${result.length}, всего отфильтровано: ${filters.filteredProducts.length}`);
        return result;
    }, [filters.filteredProducts, currentPage, itemsPerPage]);

    usePrefetchProducts(paginatedProducts);

    const totalPages = Math.ceil(filters.filteredProducts.length / itemsPerPage);

    // Автосброс страницы
    useEffect(() => {
        const hasActiveFilters =
            filters.selectedCategoryIds.length > 0 ||
            filters.selectedBrandIds.length > 0 ||
            filters.inStockOnly ||
            searchTerm.trim() !== '' ||
            filters.priceRange[0] !== 0 ||
            filters.priceRange[1] !== 20000 ||
            filters.sortBy !== 'popular';

        console.log(`[useEffect автосброс] hasActiveFilters = ${hasActiveFilters}, currentPage = ${currentPage}`);

        if (hasActiveFilters && currentPage !== 1) {
            console.log(`[Автосброс] → goToPage(1)`);
            goToPage(1);
        }
    }, [
        filters.selectedCategoryIds.length,
        filters.selectedBrandIds.length,
        filters.inStockOnly,
        filters.priceRange[0],
        filters.priceRange[1],
        filters.sortBy,
        searchTerm,
        currentPage,
        goToPage,
    ]);

    return {
        productsLoading,
        paginatedProducts,
        totalPages,
        currentPage,
        goToPage,
        ...filters,
        itemsPerPage,
    };
}