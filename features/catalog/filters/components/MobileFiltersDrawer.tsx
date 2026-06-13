'use client';

import { X } from 'lucide-react';
import CategoryFilter from "@/features/catalog/filters/components/CategoryFilter";
import BrandFilter from "@/features/catalog/filters/components/BrandFilter";


type MobileFiltersDrawerProps = {
    isOpen: boolean;
    onClose: () => void;

    // Фильтры
    selectedCategoryIds: string[];
    setSelectedCategoryIds: (ids: string[]) => void;
    selectedBrandIds: string[];
    setSelectedBrandIds: (ids: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    inStockOnly: boolean;
    setInStockOnly: (val: boolean) => void;
    sortBy: 'popular' | 'price-asc' | 'price-desc' | 'new';
    setSortBy: (val: any) => void;
    onReset: () => void;

    availableBrands: { id: string; name: string }[];
    availableCategories: { id: string; name: string }[];
};

export default function MobileFiltersDrawer({
                                                isOpen,
                                                onClose,
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
                                                onReset,
                                                availableBrands,
                                                availableCategories,
                                            }: MobileFiltersDrawerProps) {

    const handleReset = () => {
        onReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/70 flex">
            {/* Сам drawer */}
            <div
                className="bg-zinc-900 w-80 max-w-[85vw] h-full shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
                    <h3 className="text-xl font-semibold text-white">Фильтры</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-7 h-7" />
                    </button>
                </div>

                {/* Контент */}
                <div className="flex-1 overflow-auto p-5">
                    <div className="space-y-8">
                        <CategoryFilter
                            availableCategories={availableCategories}
                            selectedCategoryIds={selectedCategoryIds}
                            setSelectedCategoryIds={setSelectedCategoryIds}
                        />

                        <BrandFilter
                            availableBrands={availableBrands}
                            selectedBrandIds={selectedBrandIds}
                            setSelectedBrandIds={setSelectedBrandIds}
                        />

                        {/* PriceAndSortFilters можно добавить сюда, если нужно в мобильном drawer */}

                        {/* Кнопка сброса */}
                        <button
                            onClick={handleReset}
                            className="w-full py-3.5 text-sm font-medium text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900/50 rounded-2xl transition-colors flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Сбросить все фильтры
                        </button>
                    </div>
                </div>
            </div>

            {/* Закрытие по клику справа */}
            <div className="flex-1" onClick={onClose} />
        </div>
    );
}