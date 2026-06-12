
'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormData } from "@/features/admin/types/products-form";

type BasicProductFieldsProps = {
    register: UseFormRegister<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
};

export default function BasicProductFields({ register, errors }: BasicProductFieldsProps) {
    const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400 transition";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Артикул */}
            <div>
                <label className="block text-sm mb-2 font-medium">
                    Артикул <span className="md:hidden text-xs text-zinc-500">(код)</span>
                </label>
                <input
                    {...register('article')}
                    className={inputClass}
                    placeholder="POL-1102"
                />
                {errors.article && <p className="text-red-500 text-sm mt-1.5">{errors.article.message}</p>}
            </div>

            {/* Название */}
            <div>
                <label className="block text-sm mb-2 font-medium">
                    Название <span className="md:hidden text-xs text-zinc-500">товара</span>
                </label>
                <input
                    {...register('name')}
                    className={inputClass}
                    placeholder="Электрошокер Police 1102"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
            </div>

            {/* Цена */}
            <div>
                <label className="block text-sm mb-2 font-medium">Цена (₽)</label>
                <input
                    type="text"
                    {...register('price')}
                    className={inputClass}
                    placeholder="4990"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1.5">{errors.price.message}</p>}
            </div>

            {/* Старая цена */}
            <div>
                <label className="block text-sm mb-2 font-medium">
                    Старая цена <span className="md:hidden text-xs text-zinc-500">(опц.)</span>
                </label>
                <input
                    type="text"
                    {...register('oldPrice')}
                    className={inputClass}
                    placeholder="5990"
                />
            </div>

            {/* Остаток */}
            <div>
                <label className="block text-sm mb-2 font-medium">
                    Остаток <span className="md:hidden text-xs text-zinc-500">на складе</span>
                </label>
                <input
                    type="text"
                    {...register('stock')}
                    className={inputClass}
                    placeholder="15"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1.5">{errors.stock.message}</p>}
            </div>
        </div>
    );
}