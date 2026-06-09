'use client';

import { Plus } from 'lucide-react';

type BrandSelectorProps = {
    brands: { id: string; name: string }[];
    register: any;
    setValue: any;
    onAddNew: () => void;
};

export default function BrandSelector({
                                          brands,
                                          register,
                                          setValue,
                                          onAddNew,
                                      }: BrandSelectorProps) {
    return (
        <div>
            <label className="block text-sm mb-2">Бренд</label>
            <div className="flex gap-2">
                <select
                    {...register('brandId')}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400"
                >
                    <option value="">Выберите бренд</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={onAddNew}
                    className="px-5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2 whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Новый
                </button>
            </div>
        </div>
    );
}