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
import { useCatalogPagination } from './useCatalogPagination';   // ← новый хук

type UseCatalogProps = {
    searchTerm: string;
};

export function useCatalog({ searchTerm }: UseCatalogProps) {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    const { goToPage } = useCatalogPagination();

    // Запросы...
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
        return filters.filteredProducts.slice(start, start + itemsPerPage);
    }, [filters.filteredProducts, currentPage]);

    usePrefetchProducts(paginatedProducts);

    const totalPages = Math.ceil(filters.filteredProducts.length / itemsPerPage);

    // Автосброс страницы (упрощённый, как в рабочем проекте)
    useEffect(() => {
        const hasActiveFilters =
            filters.selectedCategoryIds.length > 0 ||
            filters.selectedBrandIds.length > 0 ||
            filters.inStockOnly ||
            searchTerm.trim() !== '' ||
            filters.priceRange[0] !== 0 ||
            filters.priceRange[1] !== 20000 ||
            filters.sortBy !== 'popular';

        if (hasActiveFilters && currentPage !== 1) {
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