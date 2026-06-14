'use client';

import { useMemo, useEffect, useRef, useCallback, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import {
    useAllLightProducts,
    useSearchProducts,
    useCategories,
    useBrands
} from '@/hooks/queries/products';

import { useCatalogFilters } from './useCatalogFilters';
import { usePrefetchProducts } from './usePrefetchProducts';

type UseCatalogProps = {
    searchTerm: string;
};

export function useCatalog({ searchTerm }: UseCatalogProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

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

    // ====================== goToPage ======================
    const goToPage = useCallback((page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;

        console.log(`goToPage called: ${page} current: ${currentPage} url: ${pathname}`);

        const newParams = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            newParams.delete('page');
        } else {
            newParams.set('page', page.toString());
        }

        const newUrl = `${pathname}?${newParams.toString()}`;

        // Используем startTransition + replace — самый стабильный способ
        startTransition(() => {
            router.replace(newUrl, { scroll: false });
        });
    }, [currentPage, totalPages, searchParams, pathname, router]);

    // ====================== Автосброс страницы ======================
    const prevFiltersRef = useRef({
        categories: 0,
        brands: 0,
        inStock: false,
        search: '',
        price: [0, 20000] as [number, number],
        sort: 'popular' as string,
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
            console.log('Auto reset to page 1 due to filters change');

            const newParams = new URLSearchParams(searchParams);
            newParams.delete('page');

            startTransition(() => {
                router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
            });
        }

        prevFiltersRef.current = {
            categories: filters.selectedCategoryIds.length,
            brands: filters.selectedBrandIds.length,
            inStock: filters.inStockOnly,
            search: searchTerm.trim(),
            price: [...filters.priceRange],
            sort: filters.sortBy,
        };
    }, [
        filters.selectedCategoryIds.length,
        filters.selectedBrandIds.length,
        filters.inStockOnly,
        filters.priceRange[0],
        filters.priceRange[1],
        filters.sortBy,
        searchTerm,
        currentPage,
        pathname,
        router,
    ]);

    return {
        productsLoading,
        paginatedProducts,
        totalPages,
        currentPage,
        ...filters,
        goToPage,
        itemsPerPage,
        isPending,
    };
}