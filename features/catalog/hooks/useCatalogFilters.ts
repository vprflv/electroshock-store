import { useState, useMemo, useEffect } from 'react';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';

type UseCatalogFiltersProps = {
    productsToShow: any[];
    categories?: any[];
    brands?: any[];
};

export function useCatalogFilters({
                                      productsToShow,
                                      categories = [],
                                      brands = []
                                  }: UseCatalogFiltersProps) {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('popular');

    // Доступные фильтры
    const availableCategories = useMemo(() => {
        if (categories.length > 0) return categories;
        return Array.from(new Set(productsToShow.map(p => p.category)))
            .filter(Boolean)
            .map(name => ({ id: name, name }));
    }, [productsToShow, categories]);

    const availableBrands = useMemo(() => {
        if (brands.length > 0) return brands;
        return Array.from(new Set(productsToShow.map(p => p.brand)))
            .filter(Boolean)
            .map(name => ({ id: name, name }));
    }, [productsToShow, brands]);

    // Основная фильтрация
    const filteredProducts = useMemo(() => {
        let result = [...productsToShow];

        // Фильтр по категориям
        if (selectedCategories.length > 0) {
            result = result.filter(p => {
                const catName = typeof p.category === 'object' ? p.category?.name : p.category;
                return selectedCategories.includes(catName);
            });
        }

        // Фильтр по брендам
        if (selectedBrands.length > 0) {
            result = result.filter(p => {
                const brandName = typeof p.brand === 'object' ? p.brand?.name : p.brand;
                return selectedBrands.includes(brandName);
            });
        }

        // Цена
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
    }, [productsToShow, selectedCategories, selectedBrands, priceRange, inStockOnly, sortBy]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 20000]);
        setInStockOnly(false);
        setSortBy('popular');
    };

    return {
        selectedCategories,
        setSelectedCategories,
        selectedBrands,
        setSelectedBrands,
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