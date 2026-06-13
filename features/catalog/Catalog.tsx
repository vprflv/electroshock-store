// features/catalog/Catalog.tsx
'use client';

import { useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import {
    useAllLightProducts,
    useSearchProducts,
    useCategories,
    useBrands
} from '@/hooks/queries/products';

import Filters from "./filters/Filters";
import ProductCard from "./product/ProductCard";
import ProductCardSkeleton from "./product/ProductCardSkeleton";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import getPaginationPages from "@/lib/utils/pagination";
import { usePrefetchProducts } from "@/features/catalog/hooks/usePrefetchProducts";
import SearchBar from "@/features/search/SearchBar";
import PriceAndSortFilters from "@/features/catalog/filters/components/PriceAndSortFilters";

type CatalogProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

export default function Catalog({ searchTerm, onSearchChange }: CatalogProps) {
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

    const {
        selectedCategoryIds,
        setSelectedCategoryIds,
        selectedBrandIds,
        setSelectedBrandIds,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        resetFilters,
        filteredProducts,
        availableCategories,
        availableBrands,
    } = useCatalogFilters({
        productsToShow: productsAfterSearch,
        availableCategories: categories,
        availableBrands: brands,
    });

    const itemsPerPage = 9;

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    usePrefetchProducts(paginatedProducts);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        const newParams = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            newParams.delete('page');
        } else {
            newParams.set('page', page.toString());
        }

        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    };

    // Автосброс страницы при изменении фильтров
    const prevFiltersRef = useRef({
        categories: 0,
        brands: 0,
        inStock: false,
        search: '',
        price: [0, 20000],
        sort: 'popular'
    });

    useEffect(() => {
        const hasActiveFilters =
            selectedCategoryIds.length > 0 ||
            selectedBrandIds.length > 0 ||
            inStockOnly ||
            searchTerm.trim() !== '' ||
            priceRange[0] !== 0 ||
            priceRange[1] !== 20000 ||
            sortBy !== 'popular';

        const filtersChanged =
            selectedCategoryIds.length !== prevFiltersRef.current.categories ||
            selectedBrandIds.length !== prevFiltersRef.current.brands ||
            inStockOnly !== prevFiltersRef.current.inStock ||
            searchTerm.trim() !== prevFiltersRef.current.search ||
            priceRange[0] !== prevFiltersRef.current.price[0] ||
            priceRange[1] !== prevFiltersRef.current.price[1] ||
            sortBy !== prevFiltersRef.current.sort;

        if (hasActiveFilters && filtersChanged && currentPage !== 1) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('page');
            router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
        }

        prevFiltersRef.current = {
            categories: selectedCategoryIds.length,
            brands: selectedBrandIds.length,
            inStock: inStockOnly,
            search: searchTerm.trim(),
            price: [...priceRange],
            sort: sortBy
        };
    }, [selectedCategoryIds.length, selectedBrandIds.length, inStockOnly, searchTerm, priceRange, sortBy, currentPage, searchParams, pathname, router]);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                {/* Блок фильтров */}
                <div className="lg:w-80 flex-shrink-0">
                    <Filters
                        selectedCategoryIds={selectedCategoryIds}
                        setSelectedCategoryIds={setSelectedCategoryIds}
                        selectedBrandIds={selectedBrandIds}
                        setSelectedBrandIds={setSelectedBrandIds}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        onReset={resetFilters}
                        availableBrands={availableBrands}
                        availableCategories={availableCategories}
                    />
                </div>

                {/* Основная часть каталога */}
                <div className="flex-1">
                    {/* Поиск */}
                    <div className="mb-8">
                        <SearchBar
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full max-w-2xl mx-auto"
                        />
                    </div>

                    {/* Сортировка + Цена — справа */}
                    <div className="flex justify-end mb-8">
                        <PriceAndSortFilters
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </div>

                    {/* Заголовок + статистика */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <h2 className="text-3xl md:text-4xl font-semibold">Каталог товаров</h2>
                        <p className="text-zinc-400 text-sm md:text-base">
                            Показано: <span className="text-white font-medium">
                                {productsLoading ? '—' : Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                            </span> из {filteredProducts.length}
                        </p>
                    </div>

                    {/* Товары */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {productsLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                        ) : (
                            paginatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>

                    {/* Пагинация */}
                    {!productsLoading && totalPages > 1 && (
                        <div className="flex justify-center mt-16">
                            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-2">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-5 py-3 hover:bg-zinc-800 rounded-2xl disabled:opacity-40 transition-all"
                                >
                                    ← Назад
                                </button>

                                <div className="flex items-center gap-1">
                                    {getPaginationPages(currentPage, totalPages).map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === 'number' && goToPage(page)}
                                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all text-sm font-medium ${
                                                page === currentPage
                                                    ? 'bg-yellow-400 text-black font-semibold scale-110'
                                                    : 'hover:bg-zinc-800 text-zinc-300'
                                            } ${page === '...' ? 'cursor-default text-zinc-500' : ''}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-5 py-3 hover:bg-zinc-800 rounded-2xl disabled:opacity-40 transition-all"
                                >
                                    Вперёд →
                                </button>
                            </div>
                        </div>
                    )}

                    {!productsLoading && filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-2xl text-zinc-400 mb-2">Ничего не найдено 😔</p>
                            <p className="text-zinc-500">Попробуйте изменить параметры поиска или фильтры</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}