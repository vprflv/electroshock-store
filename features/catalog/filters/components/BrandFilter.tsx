// features/catalog/filters/BrandFilter.tsx
'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FilterBrand = {
    id: string;
    name: string;
};

type BrandFilterProps = {
    availableBrands: FilterBrand[];
    selectedBrandIds: string[];
    setSelectedBrandIds: (ids: string[]) => void;
};

export default function BrandFilter({
                                        availableBrands,
                                        selectedBrandIds,
                                        setSelectedBrandIds,
                                    }: BrandFilterProps) {
    const [isOpen, setIsOpen] = useState(false); // ← Изменено на false

    const toggleBrand = (id: string) => {
        if (selectedBrandIds.includes(id)) {
            setSelectedBrandIds(selectedBrandIds.filter(brandId => brandId !== id));
        } else {
            setSelectedBrandIds([...selectedBrandIds, id]);
        }
    };

    return (
        <div className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left py-2 group"
            >
                <p className="text-sm font-medium text-yellow-400">Бренд</p>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="space-y-3">
                    {availableBrands.map((brand) => (
                        <label
                            key={brand.id}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedBrandIds.includes(brand.id)}
                                    onChange={() => toggleBrand(brand.id)}
                                    className="peer w-5 h-5 accent-transparent border-2 border-zinc-600 rounded-md
                                               cursor-pointer transition-all appearance-none
                                               checked:border-yellow-400 checked:bg-yellow-400"
                                />
                                <svg
                                    className="absolute w-5 h-5 hidden peer-checked:block pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-white text-[15px] group-hover:text-yellow-400 transition">
                                {brand.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}