// features/catalog/filters/Filters.tsx
'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
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
};

export default function Filters(props: FiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleReset = () => {
        props.onReset();
        setIsOpen(false);
    };

    return (
        <>
            {/* Мобильная кнопка */}
            <div className="lg:hidden mb-6 px-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 border hover:border-yellow-400 rounded-2xl py-4 text-base font-medium"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    Фильтры
                </button>
            </div>

            {/* Десктопный сайдбар */}
            <div className="hidden lg:block bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sticky top-24 w-80 flex-shrink-0">
                <SideFilters {...props} onReset={handleReset} />
            </div>

            {/* Мобильная панель */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/80 flex items-end">
                    <div className="bg-zinc-900 w-full max-h-[92%] rounded-t-3xl flex flex-col">
                        <div className="p-5 border-b border-zinc-800 flex justify-between">
                            <h3 className="text-xl font-semibold">Фильтры</h3>
                            <button onClick={() => setIsOpen(false)}>
                                <X className="w-7 h-7" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-5">
                            <SideFilters {...props} onReset={handleReset} />
                        </div>
                    </div>
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
        <div className="space-y-8 border-yellow-400 ">
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

            {/*/!* Только в наличии *!/*/}
            {/*<label className="flex items-center gap-3 cursor-pointer text-base pt-2">*/}
            {/*    <input*/}
            {/*        type="checkbox"*/}
            {/*        checked={inStockOnly}*/}
            {/*        onChange={(e) => setInStockOnly(e.target.checked)}*/}
            {/*        className="w-5 h-5 accent-yellow-400"*/}
            {/*    />*/}
            {/*    <span className="text-white">Только в наличии</span>*/}
            {/*</label>*/}

            <button
                onClick={onReset}
                className="text-sm text-zinc-400 hover:text-red-400 flex items-center gap-1.5 mx-auto"
            >
                <X className="w-4 h-4" /> Сбросить фильтры
            </button>
        </div>
    );
}