'use client';

import { useState, useMemo } from 'react';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';

type UseCatalogFiltersProps = {
    productsToShow: any[];
    availableCategories?: any[];   // настоящие категории из БД
    availableBrands?: any[];       // настоящие бренды из БД
};

export function useCatalogFilters({
                                      productsToShow,
                                      availableCategories = [],
                                      availableBrands = [],
                                  }: UseCatalogFiltersProps) {

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('popular');

    // Основная фильтрация
    const filteredProducts = useMemo(() => {
        let result = [...productsToShow];

        // Фильтр по категориям (по id)
        if (selectedCategoryIds.length > 0) {
            result = result.filter(p =>
                p.category?.id && selectedCategoryIds.includes(p.category.id)
            );
        }

        // Фильтр по брендам (по id)
        if (selectedBrandIds.length > 0) {
            result = result.filter(p =>
                p.brand?.id && selectedBrandIds.includes(p.brand.id)
            );
        }

        // Фильтр по цене
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Только в наличии
        if (inStockOnly) {
            result = result.filter(p => p.stock > 0);
        }

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'new':
                result.sort((a, b) => Number(b.id) - Number(a.id));
                break;
            case 'popular':
            default:
                result.sort((a, b) => (b.stock || 0) - (a.stock || 0));
                break;
        }

        return result;
    }, [
        productsToShow,
        selectedCategoryIds,
        selectedBrandIds,
        priceRange,
        inStockOnly,
        sortBy
    ]);

    const resetFilters = () => {
        setSelectedCategoryIds([]);
        setSelectedBrandIds([]);
        setPriceRange([0, 20000]);
        setInStockOnly(false);
        setSortBy('popular');
    };

    return {
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
        filteredProducts,
        availableCategories,
        availableBrands,
        resetFilters,
    };
}