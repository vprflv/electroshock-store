'use client';

import { useCatalog } from './hooks/useCatalog';
import Filters from "./filters/Filters";
import ProductCard from "./product/ProductCard";
import ProductCardSkeleton from "./product/ProductCardSkeleton";
import SearchBar from "@/features/search/SearchBar";
import PriceAndSortFilters from "@/features/catalog/filters/components/PriceAndSortFilters";
import getPaginationPages from "@/lib/utils/pagination";
import HelpSelection from "@/features/catalog/help/HelpSelection";

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
        resetFilters,
        availableCategories,
        availableBrands,
    } = useCatalog({ searchTerm });

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                {/* ====================== ЛЕВАЯ КОЛОНКА (Десктоп) ====================== */}
                <div className="hidden lg:flex lg:flex-col lg:w-80 flex-shrink-0 gap-8">

                    {/* 1. Фильтры */}
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

                    {/* 2. Помощь в подборе */}
                    <HelpSelection />

                </div>

                {/* ====================== МОБИЛЬНЫЙ DRAWER ====================== */}
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

                {/* ====================== ОСНОВНОЙ КОНТЕНТ ====================== */}
                <div className="flex-1">
                    {/* Поиск */}
                    <div className="mb-8">
                        <SearchBar
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full max-w-xl"
                        />
                    </div>

                    {/* Сортировка + статистика */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <PriceAndSortFilters
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>

                        <p className="hidden md:block text-zinc-400 text-sm md:text-base whitespace-nowrap">
                            Показано: <span className="text-yellow-400 font-medium">
                                {productsLoading ? '—' : Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                            </span> из {filteredProducts.length}
                        </p>
                    </div>

                    {/* Сетка товаров */}
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

                    {/* Пустое состояние */}
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