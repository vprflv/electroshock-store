'use client';

import { X } from 'lucide-react';
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
                    className="text-sm text-zinc-400 hover:text-white flex items-center gap-1"
                >
                    <X className="w-4 h-4" /> Сбросить
                </button>
            </div>

            {/* Сортировка */}
            <div className="mb-6">
                <p className="text-sm text-zinc-400 mb-2">Сортировать</p>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
                >
                    <option value="popular">По популярности</option>
                    <option value="price-asc">Цена: по возрастанию</option>
                    <option value="price-desc">Цена: по убыванию</option>
                    <option value="new">Новинки</option>
                </select>
            </div>

            {/* Категории */}
            <div className="mb-6">
                <p className="text-sm text-zinc-400 mb-3">Категория</p>
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
                <p className="text-sm text-zinc-400 mb-3">Бренд</p>
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
                <p className="text-sm text-zinc-400 mb-3">Цена, ₽</p>
                <div className="flex gap-3 items-center">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 w-full"
                        placeholder="от"
                    />
                    <span className="text-zinc-500">-</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 20000])}
                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 w-full"
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