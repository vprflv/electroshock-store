// features/admin/products/new/components/ProductForm/brands/BrandSelector.tsx
'use client';

import * as Select from '@radix-ui/react-select';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

type BrandSelectorProps = {
    brands: { id: string; name: string }[];
    register: any;
    setValue: any;
    onAddNew: () => void;
    onDeleteClick: () => void;
};

export default function BrandSelector({
                                          brands,
                                          register,
                                          setValue,
                                          onAddNew,
                                          onDeleteClick,
                                      }: BrandSelectorProps) {

    const selectedId = register('brandId')?.value;

    return (
        <div>
            <label className="block text-sm mb-2">Бренд</label>

            <Select.Root value={selectedId} onValueChange={(value) => setValue('brandId', value)}>
                <Select.Trigger className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between focus:border-yellow-400 transition">
                    <Select.Value placeholder="Выберите бренд" />
                    <ChevronDown className="w-4 h-4" />
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <Select.Viewport className="p-2 max-h-80 overflow-auto">
                            {brands.map((brand) => (
                                <Select.Item
                                    key={brand.id}
                                    value={brand.id}
                                    className="px-4 py-3 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm"
                                >
                                    <Select.ItemText>{brand.name}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>

                        {/* Кнопки действий внизу списка */}
                        <div className="border-t border-zinc-700 p-2 flex gap-2">
                            <button
                                onClick={onAddNew}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-yellow-400 hover:bg-zinc-800 rounded-lg transition"
                            >
                                <Plus className="w-4 h-4" />
                                Новый бренд
                            </button>

                            <button
                                onClick={onDeleteClick}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-zinc-800 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Удалить бренд
                            </button>
                        </div>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}