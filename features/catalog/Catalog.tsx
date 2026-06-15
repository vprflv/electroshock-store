'use client';

import { useCatalog } from './hooks/useCatalog';
import Filters from "./filters/Filters";
import ProductCard from "./product/ProductCard";
import ProductCardSkeleton from "./product/ProductCardSkeleton";
import SearchBar from "@/features/search/SearchBar";
import PriceAndSortFilters from "@/features/catalog/filters/components/PriceAndSortFilters";
import getPaginationPages from "@/lib/utils/pagination";
import HelpSelection from "@/features/catalog/help/HelpSelection";
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useSearchParams, usePathname } from 'next/navigation';
type CatalogProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    isFiltersOpen: boolean;
    setIsFiltersOpen: (open: boolean) => void;
};

export default function Catalog({
                                    searchTerm,
                                    onSearchChange,
                                    isFiltersOpen,
                                    setIsFiltersOpen
                                }: CatalogProps) {

    const {
        productsLoading,
        paginatedProducts,
        filteredProducts,
        totalPages,
        currentPage,
        goToPage,
        itemsPerPage,

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
        isPending,
        resetFilters,
        availableCategories,
        availableBrands,
    } = useCatalog({ searchTerm });

    const [showScrollTop, setShowScrollTop] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 min-h-[calc(100vh-180px)] flex flex-col relative">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 flex-1">

                {/* Левая колонка фильтров */}
                <div className="hidden lg:flex lg:flex-col lg:w-80 flex-shrink-0 gap-8">
                    <div className="mb-8">
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
                    <HelpSelection />
                </div>

                {/* Мобильные фильтры */}
                <div className="lg:hidden">
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
                        isOpen={isFiltersOpen}
                        onClose={() => setIsFiltersOpen(false)}
                    />
                </div>

                {/* Основной контент */}
                <div className="flex-1 flex flex-col">

                    {/* Поиск и сортировка */}
                    <div className="mb-8">
                        <SearchBar
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full max-w-xl"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <PriceAndSortFilters
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />

                        <p className="hidden md:block text-zinc-400 text-sm md:text-base whitespace-nowrap">
                            Показано: <span className="text-yellow-400 font-medium">
                                {productsLoading ? '—' : Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                            </span> из {filteredProducts.length}
                        </p>
                    </div>

                    {/* Сетка товаров */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 content-start">
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
                        <div className="mt-auto pt-12 pb-8 flex justify-center">
                            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-2">

                                {/* Назад */}
                                <Link
                                    href={currentPage > 1
                                        ? `${pathname}?${new URLSearchParams({
                                            ...Object.fromEntries(searchParams),
                                            page: (currentPage - 1).toString()
                                        }).toString()}`
                                        : '#'
                                    }
                                    scroll={false}
                                    prefetch={false}
                                    className={`px-5 py-3 hover:bg-zinc-800 rounded-2xl transition-all ${
                                        currentPage === 1 ? 'opacity-40 pointer-events-none' : ''
                                    }`}
                                >
                                    ← Назад
                                </Link>

                                {/* Номера страниц */}
                                <div className="flex items-center gap-1">
                                    {getPaginationPages(currentPage, totalPages).map((page, index) => {
                                        if (typeof page !== 'number') {
                                            return (
                                                <span
                                                    key={index}
                                                    className="w-10 h-10 flex items-center justify-center text-zinc-500 cursor-default"
                                                >
                                ...
                            </span>
                                            );
                                        }

                                        const isActive = page === currentPage;
                                        const href = page === 1
                                            ? pathname
                                            : `${pathname}?page=${page}`;

                                        return (
                                            <Link
                                                key={index}
                                                href={href}
                                                scroll={false}
                                                prefetch={false}
                                                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all text-sm font-medium ${
                                                    isActive
                                                        ? 'bg-yellow-400 text-black font-semibold scale-110'
                                                        : 'hover:bg-zinc-800 text-zinc-300 hover:scale-105'
                                                }`}
                                            >
                                                {page}
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Вперёд */}
                                <Link
                                    href={currentPage < totalPages
                                        ? `${pathname}?${new URLSearchParams({
                                            ...Object.fromEntries(searchParams),
                                            page: (currentPage + 1).toString()
                                        }).toString()}`
                                        : '#'
                                    }
                                    scroll={false}
                                    prefetch={false}
                                    className={`px-5 py-3 hover:bg-zinc-800 rounded-2xl transition-all ${
                                        currentPage === totalPages ? 'opacity-40 pointer-events-none' : ''
                                    }`}
                                >
                                    Вперёд →
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Пустое состояние */}
                    {!productsLoading && filteredProducts.length === 0 && (
                        <div className="flex-1 flex items-center justify-center py-20">
                            <div className="text-center">
                                <p className="text-2xl text-zinc-400 mb-2">Ничего не найдено 😔</p>
                                <p className="text-zinc-500">Попробуйте изменить параметры поиска или фильтры</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ====================== КНОПКА "НАВЕРХ" (только десктоп) ====================== */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="hidden md:flex fixed bottom-8 right-8 z-50 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400 text-white p-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Наверх"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}