'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';

type FilterCategory = {
    id: string;
    name: string;
    slug?: string;
};

type FilterBrand = {
    id: string;
    name: string;
    slug?: string;
};

type FiltersProps = {
    selectedCategoryIds: string[];
    setSelectedCategoryIds: (ids: string[]) => void;
    selectedBrandIds: string[];
    setSelectedBrandIds: (ids: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    inStockOnly: boolean;
    setInStockOnly: (val: boolean) => void;
    sortBy: SortOption;
    setSortBy: (val: SortOption) => void;
    onReset: () => void;
    availableBrands: FilterBrand[];
    availableCategories: FilterCategory[];
};

export default function Filters(props: FiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        selectedCategoryIds, setSelectedCategoryIds,
        selectedBrandIds, setSelectedBrandIds,
        priceRange, setPriceRange,
        inStockOnly, setInStockOnly,
        sortBy, setSortBy,
        onReset,
        availableBrands,
        availableCategories,
    } = props;

    const handleReset = () => {
        onReset();
        setIsOpen(false);
    };

    return (
        <>
            {/* Кнопка открытия на мобильных */}
            <div className="lg:hidden mb-4 px-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700
                               hover:border-yellow-400 rounded-2xl py-3.5 text-sm font-medium active:scale-[0.985]"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    Открыть фильтры
                </button>
            </div>

            {/* Десктоп версия */}
            <div className="hidden lg:block bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-45">
                <DesktopFilters {...props} onReset={handleReset} />
            </div>

            {/* Мобильная выдвижная панель */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end">
                    <div className="bg-zinc-900 w-full max-h-[92%] rounded-t-3xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                            <h3 className="font-semibold text-lg">Фильтры</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-5 pb-24">
                            <DesktopFilters {...props} onReset={handleReset} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-5">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 bg-yellow-400 text-black font-semibold rounded-2xl text-lg active:bg-yellow-300"
                            >
                                Показать товары
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* ====================== ВНУТРЕННИЙ КОМПОНЕНТ ====================== */
function DesktopFilters({
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
                        }: FiltersProps & { onReset: () => void }) {
    return (
        <>
            {/* Сортировка */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-2">Сортировать</p>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите сортировку" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular">По популярности</SelectItem>
                        <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                        <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                        <SelectItem value="new">Новинки</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Категории */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-3">Категория</p>
                <div className="space-y-3">
                    {availableCategories.map((cat: FilterCategory) => (   // ← явно указали тип
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer text-base">
                            <input
                                type="checkbox"
                                checked={selectedCategoryIds.includes(cat.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedCategoryIds([...selectedCategoryIds, cat.id]);
                                    } else {
                                        setSelectedCategoryIds(
                                            selectedCategoryIds.filter((id) => id !== cat.id)
                                        );
                                    }
                                }}
                                className="w-5 h-5 accent-yellow-400"
                            />
                            <span>{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Бренды */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-3">Бренд</p>
                <div className="space-y-3">
                    {availableBrands.map((brand: FilterBrand) => (   // ← явно указали тип
                        <label key={brand.id} className="flex items-center gap-3 cursor-pointer text-base">
                            <input
                                type="checkbox"
                                checked={selectedBrandIds.includes(brand.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedBrandIds([...selectedBrandIds, brand.id]);
                                    } else {
                                        setSelectedBrandIds(
                                            selectedBrandIds.filter((id) => id !== brand.id)
                                        );
                                    }
                                }}
                                className="w-5 h-5 accent-yellow-400"
                            />
                            <span>{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Цена */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-3">Цена, ₽</p>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={priceRange[0] === 0 ? '' : priceRange[0]}
                        onChange={(e) => setPriceRange([e.target.value === '' ? 0 : +e.target.value, priceRange[1]])}
                        className="bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-2xl px-4 py-3 w-full text-base"
                        placeholder="от"
                    />
                    <span className="text-zinc-500 self-center">-</span>
                    <input
                        type="text"
                        value={priceRange[1] === 20000 ? '' : priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], e.target.value === '' ? 20000 : +e.target.value])}
                        className="bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-2xl px-4 py-3 w-full text-base"
                        placeholder="до"
                    />
                </div>
            </div>

            {/* Только в наличии */}
            <label className="flex items-center gap-3 cursor-pointer text-base">
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 accent-yellow-400"
                />
                <span>Только в наличии</span>
            </label>

            <button
                onClick={onReset}
                className="mt-8 text-sm text-zinc-400 hover:text-red-400 flex items-center gap-1.5 mx-auto"
            >
                <X className="w-4 h-4" /> Сбросить все фильтры
            </button>
        </>
    );
}