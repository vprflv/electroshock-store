'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';

type UseCatalogFiltersProps = {
    productsToShow: any[];
    availableCategories?: any[];
    availableBrands?: any[];
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

    const searchParams = useSearchParams();

    // Автоматический выбор категории при переходе с главной
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (!categoryParam) {
            // Если параметра нет — не трогаем фильтры
            return;
        }

        if (availableCategories.length === 0) return;

        const matchedCategory = availableCategories.find(cat =>
            cat.slug?.toLowerCase() === categoryParam.toLowerCase() ||
            cat.name.toLowerCase().includes(categoryParam.toLowerCase())
        );

        if (matchedCategory) {
            setSelectedCategoryIds([matchedCategory.id]); // выбираем только эту категорию
        }
    }, [searchParams, availableCategories]);

    // ... остальная логика фильтрации (filteredProducts) без изменений
    const filteredProducts = useMemo(() => {
        let result = [...productsToShow];

        if (selectedCategoryIds.length > 0) {
            result = result.filter(p =>
                p.category?.id && selectedCategoryIds.includes(p.category.id)
            );
        }

        if (selectedBrandIds.length > 0) {
            result = result.filter(p =>
                p.brand?.id && selectedBrandIds.includes(p.brand.id)
            );
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (inStockOnly) {
            result = result.filter(p => (p.stock ?? 0) > 0);
        }

        switch (sortBy) {
            case 'price-asc': result.sort((a, b) => a.price - b.price); break;
            case 'price-desc': result.sort((a, b) => b.price - a.price); break;
            case 'new': result.sort((a, b) => Number(b.id) - Number(a.id)); break;
            case 'popular':
            default: result.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0)); break;
        }

        return result;
    }, [productsToShow, selectedCategoryIds, selectedBrandIds, priceRange, inStockOnly, sortBy]);

    const resetFilters = useCallback(() => {
        setSelectedCategoryIds([]);
        setSelectedBrandIds([]);
        setPriceRange([0, 20000]);
        setInStockOnly(false);
        setSortBy('popular');
    }, []);

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