'use client';

import {useMemo, useEffect, useRef, useTransition} from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


import {
    useAllLightProducts,
    useSearchProducts,
    useCategories,
    useBrands
} from '@/hooks/queries/products';

import { useCatalogFilters } from './useCatalogFilters';
import { usePrefetchProducts } from './usePrefetchProducts';
import getPaginationPages from "@/lib/utils/pagination";

type UseCatalogProps = {
    searchTerm: string;
};

export function useCatalog({ searchTerm }: UseCatalogProps) {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentPage = parseInt(searchParams.get('page') || '1');

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
        return filters.filteredProducts.slice(start, start + itemsPerPage);
    }, [filters.filteredProducts, currentPage, itemsPerPage]);

    usePrefetchProducts(paginatedProducts);

    const totalPages = Math.ceil(filters.filteredProducts.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;

        startTransition(() => {
            const newParams = new URLSearchParams(searchParams.toString());

            if (page === 1) {
                newParams.delete('page');
            } else {
                newParams.set('page', page.toString());
            }

            router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
        });
    };

    // Автосброс страницы при изменении фильтров
    const prevFiltersRef = useRef({
        categories: 0,
        brands: 0,
        inStock: false,
        search: '',
        price: [0, 20000] as [number, number],
        sort: 'popular' as const,
    });

    useEffect(() => {
        const hasActiveFilters =
            filters.selectedCategoryIds.length > 0 ||
            filters.selectedBrandIds.length > 0 ||
            filters.inStockOnly ||
            searchTerm.trim() !== '' ||
            filters.priceRange[0] !== 0 ||
            filters.priceRange[1] !== 20000 ||
            filters.sortBy !== 'popular';

        const filtersChanged =
            filters.selectedCategoryIds.length !== prevFiltersRef.current.categories ||
            filters.selectedBrandIds.length !== prevFiltersRef.current.brands ||
            filters.inStockOnly !== prevFiltersRef.current.inStock ||
            searchTerm.trim() !== prevFiltersRef.current.search ||
            filters.priceRange[0] !== prevFiltersRef.current.price[0] ||
            filters.priceRange[1] !== prevFiltersRef.current.price[1] ||
            filters.sortBy !== prevFiltersRef.current.sort;

        if (hasActiveFilters && filtersChanged && currentPage !== 1) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('page');
            router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
        }

        // Обновляем реф
        prevFiltersRef.current = {
            categories: filters.selectedCategoryIds.length,
            brands: filters.selectedBrandIds.length,
            inStock: filters.inStockOnly,
            search: searchTerm.trim(),
            price: [...filters.priceRange],
            sort: 'popular' as const,
        };
    }, [
        filters.selectedCategoryIds.length,
        filters.selectedBrandIds.length,
        filters.inStockOnly,
        filters.priceRange,
        filters.sortBy,
        searchTerm,
        currentPage,
        searchParams,
        pathname,
        router,
    ]);

    return {
        // Данные
        productsLoading,
        paginatedProducts,
        totalPages,
        currentPage,

        // Фильтры
        ...filters,

        // Действия
        goToPage,
        itemsPerPage,
        isPending
    };
}