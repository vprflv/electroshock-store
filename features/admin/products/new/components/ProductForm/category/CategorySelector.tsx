// app/admin/products/new/components/ProductForm/category/CategorySelector.tsx
'use client';

import * as Select from '@radix-ui/react-select';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

type CategorySelectorProps = {
    categories: { id: string; name: string }[];
    register: any;
    setValue: any;
    onAddNew: () => void;
    onDeleteClick: () => void;           // ← новое
};

export default function CategorySelector({
                                             categories,
                                             register,
                                             setValue,
                                             onAddNew,
                                             onDeleteClick,
                                         }: CategorySelectorProps) {

    const selectedId = register('categoryId')?.value;

    return (
        <div>
            <label className="block text-sm mb-2">Категория</label>

            <Select.Root value={selectedId} onValueChange={(value) => setValue('categoryId', value)}>
                <Select.Trigger className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between focus:border-yellow-400">
                    <Select.Value placeholder="Выберите категорию" />
                    <ChevronDown className="w-4 h-4" />
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <Select.Viewport className="p-2 max-h-80 overflow-auto">
                            {categories.map((cat) => (
                                <Select.Item
                                    key={cat.id}
                                    value={cat.id}
                                    className="px-4 py-3 hover:bg-zinc-800 rounded-lg cursor-pointer text-sm"
                                >
                                    <Select.ItemText>{cat.name}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>

                        {/* Кнопки действий */}
                        <div className="border-t border-zinc-700 p-2 flex gap-2">
                            <button
                                onClick={onAddNew}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-yellow-400 hover:bg-zinc-800 rounded-lg transition"
                            >
                                <Plus className="w-4 h-4" />
                                Новая категория
                            </button>

                            <button
                                onClick={onDeleteClick}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-zinc-800 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Удалить категорию
                            </button>
                        </div>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}