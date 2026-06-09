'use client';

import { Plus } from 'lucide-react';

type CategorySelectorProps = {
    categories: { id: string; name: string }[];
    register: any;
    setValue: any;
    onAddNew: () => void;
};

export default function CategorySelector({
                                             categories,
                                             register,
                                             setValue,
                                             onAddNew,
                                         }: CategorySelectorProps) {
    return (
        <div>
            <label className="block text-sm mb-2">Категория</label>
            <div className="flex gap-2">
                <select
                    {...register('categoryId')}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400"
                >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
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