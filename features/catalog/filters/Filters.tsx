'use client';

import { X } from 'lucide-react';
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

export default function Filters({
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
                                }: FiltersProps) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Фильтры</h3>
                <button
                    onClick={onReset}
                    className="text-sm text-zinc-400 hover:text-yellow-400 flex items-center gap-1"
                >
                    <X className="w-4 h-4 "  /> Сбросить
                </button>
            </div>

            {/* Сортировка */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-2">Сортировать</p>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите сортировку" />
                    </SelectTrigger>

                    <SelectContent className="w-full min-w-[270px] max-w-[360px]">
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
                {availableCategories.map((cat) => (
                    <label
                        key={cat.id}                    // ← теперь надёжно
                        className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategoryIds.includes(cat.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedCategoryIds([...selectedCategoryIds, cat.id]);
                                } else {
                                    setSelectedCategoryIds(
                                        selectedCategoryIds.filter(id => id !== cat.id)
                                    );
                                }
                            }}
                            className="w-4 h-4 accent-yellow-400"
                        />
                        <span className="text-white">{cat.name}</span>
                    </label>
                ))}
            </div>

            {/* Бренды */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-3">Бренд</p>
                {availableBrands.map((brand) => (
                    <label
                        key={brand.id}
                        className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedBrandIds.includes(brand.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedBrandIds([...selectedBrandIds, brand.id]);
                                } else {
                                    setSelectedBrandIds(
                                        selectedBrandIds.filter(id => id !== brand.id)
                                    );
                                }
                            }}
                            className="w-4 h-4 accent-yellow-400"
                        />
                        <span className="text-white">{brand.name}</span>
                    </label>
                ))}
            </div>

            {/* Цена */}
            <div className="mb-6">
                <p className="text-sm text-yellow-400 mb-3">Цена, ₽</p>
                <div className="flex gap-3 items-center">
                    <input
                        type="text"                    // ← изменили
                        value={priceRange[0] === 0 ? '' : priceRange[0]}   // ← важно
                        onChange={(e) => {
                            const val = e.target.value === '' ? 0 : +e.target.value;
                            setPriceRange([val, priceRange[1]]);
                        }}
                        className="bg-zinc-800 border border-yellow-400 rounded-xl px-4 py-3 w-full
                       focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
                       [appearance:textfield]
                       [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="от"
                    />
                    <span className="text-zinc-500 font-medium">-</span>
                    <input
                        type="text"                    // ← изменили
                        value={priceRange[1] === 20000 ? '' : priceRange[1]}
                        onChange={(e) => {
                            const val = e.target.value === '' ? 20000 : +e.target.value;
                            setPriceRange([priceRange[0], val]);
                        }}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 w-full
                       focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
                       [appearance:textfield]
                       [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="до"
                    />
                </div>
            </div>

            {/* Только в наличии */}
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-yellow-400"
                />
                <span>Только в наличии</span>
            </label>
        </div>
    );
}