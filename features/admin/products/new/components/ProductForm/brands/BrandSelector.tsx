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
            <label className="block text-sm mb-2 font-medium text-white">
                Бренд
            </label>

            <Select.Root value={selectedId} onValueChange={(value) => setValue('brandId', value)}>
                <Select.Trigger className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4
                    flex items-center justify-between focus:border-yellow-400 transition text-base text-white">
                    <Select.Value
                        placeholder="Выберите бренд"
                        className="text-zinc-400"
                    />
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden w-[var(--radix-select-trigger-width)]"
                        position="popper"
                        sideOffset={8}
                    >
                        <Select.Viewport className="p-2 max-h-80 overflow-auto">
                            {brands.map((brand) => (
                                <Select.Item
                                    key={brand.id}
                                    value={brand.id}
                                    className="px-5 py-4 hover:bg-zinc-800 rounded-xl cursor-pointer text-base text-white flex items-center"
                                >
                                    <Select.ItemText>{brand.name}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>

                        {/* Кнопки действий */}
                        <div className="border-t border-zinc-700 p-3 flex gap-3">
                            <button
                                onClick={onAddNew}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-yellow-400 hover:bg-zinc-800 rounded-xl transition text-sm font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Новый бренд
                            </button>

                            <button
                                onClick={onDeleteClick}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-red-400 hover:bg-zinc-800 rounded-xl transition text-sm font-medium"
                            >
                                <Trash2 className="w-5 h-5" />
                                Удалить бренд
                            </button>
                        </div>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}