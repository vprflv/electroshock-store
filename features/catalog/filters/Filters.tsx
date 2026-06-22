'use client';

import { X } from 'lucide-react';
import CategoryFilter from "@/features/catalog/filters/components/CategoryFilter";
import BrandFilter from "@/features/catalog/filters/components/BrandFilter";

type FiltersProps = {
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


    isOpen?: boolean;
    onClose?: () => void;
};

export default function Filters(props: FiltersProps) {
    const { isOpen = false, onClose } = props;

    const handleReset = () => {
        props.onReset();
        onClose?.();           // закрываем drawer после сброса
    };

    return (
        <>
            {/* ====================== ДЕСКТОПНЫЙ САЙДБАР ====================== */}
            <div className="hidden lg:block bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sticky top-24 w-80 flex-shrink-0">
                <SideFilters {...props} onReset={handleReset} />
            </div>

            {/* ====================== МОБИЛЬНЫЙ LEFT DRAWER ====================== */}
            {isOpen && onClose && (
                <div className="lg:hidden fixed inset-0 z-[60] bg-black/70 flex">
                    {/* Панель, выдвигается слева */}
                    <div
                        className="bg-zinc-900 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Заголовок */}
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
                            <h3 className="text-xl font-semibold">Фильтры</h3>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-zinc-400 hover:text-white"
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>

                        {/* Контент фильтров */}
                        <div className="flex-1 overflow-auto p-5">
                            <SideFilters {...props} onReset={handleReset} />
                        </div>
                    </div>

                    {/* Закрытие по клику на пустую область справа */}
                    <div className="flex-1" onClick={onClose} />
                </div>
            )}
        </>
    );
}

/* ====================== БОКОВЫЕ ФИЛЬТРЫ ====================== */
function SideFilters({
                         selectedCategoryIds,
                         setSelectedCategoryIds,
                         selectedBrandIds,
                         setSelectedBrandIds,
                         inStockOnly,
                         setInStockOnly,
                         onReset,
                         availableBrands,
                         availableCategories,
                     }: any) {
    return (
        <div className="space-y-8">
            {/* Категория */}
            <CategoryFilter
                availableCategories={availableCategories}
                selectedCategoryIds={selectedCategoryIds}
                setSelectedCategoryIds={setSelectedCategoryIds}
            />

            {/* Бренд */}
            <BrandFilter
                availableBrands={availableBrands}
                selectedBrandIds={selectedBrandIds}
                setSelectedBrandIds={setSelectedBrandIds}
            />

            {/* Кнопка сброса */}
            <button
                onClick={onReset}
                className="text-sm text-zinc-400 hover:text-red-400 flex items-center gap-1.5 mx-auto mt-6"
            >
                <X className="w-4 h-4" /> Сбросить фильтры
            </button>
        </div>
    );
}