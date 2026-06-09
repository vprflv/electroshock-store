'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import ProductImageUpload from './ProductImageUpload';
import CategoryModal from './CategoryModal';
import BrandModal from './BrandModal';

const productSchema = z.object({
    name: z.string().min(3, 'Название должно быть минимум 3 символа'),
    article: z.string().min(2, 'Артикул обязателен'),
    price: z.string().min(1, 'Цена обязательна').regex(/^\d+$/, 'Цена должна быть числом'),
    oldPrice: z.string().optional(),
    stock: z.string().min(1, 'Остаток обязателен').regex(/^\d+$/, 'Остаток должен быть числом'),
    description: z.string().min(10, 'Описание должно быть минимум 10 символов'),
    categoryId: z.string().min(1, 'Выберите категорию'),
    brandId: z.string().min(1, 'Выберите бренд'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm() {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: { stock: '0', price: '0', oldPrice: '' },
    });

    // Загружаем категории и бренды
    useEffect(() => {
        fetch('/api/admin/categories').then(r => r.json()).then(setCategories);
        fetch('/api/admin/brands').then(r => r.json()).then(setBrands);
    }, []);

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition";

    const addNewCategory = (newCat: { id: string; name: string }) => {
        setCategories(prev => [...prev, newCat]);
        setValue('categoryId', newCat.id);
        setShowCategoryModal(false);
    };

    const addNewBrand = (newBrand: { id: string; name: string }) => {
        setBrands(prev => [...prev, newBrand]);
        setValue('brandId', newBrand.id);
        setShowBrandModal(false);
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsLoading(true);
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('article', data.article);
        formData.append('price', data.price);
        if (data.oldPrice) formData.append('oldPrice', data.oldPrice);
        formData.append('stock', data.stock);
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('brandId', data.brandId);

        images.forEach(file => formData.append('images', file));

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Ошибка при создании');

            alert('✅ Товар успешно создан!');
            window.location.href = '/admin/products';
        } catch (err) {
            alert('Ошибка при создании товара');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Артикул</label>
                    <input {...register('article')} className={inputClass} placeholder="POL-1102" />
                    {errors.article && <p className="text-red-500 text-sm mt-1">{errors.article.message}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-2">Название товара</label>
                    <input {...register('name')} className={inputClass} placeholder="Электрошокер Police 1102" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-2">Цена (₽)</label>
                    <input type="text" {...register('price')} className={inputClass} placeholder="4990" />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm mb-2">Старая цена (необязательно)</label>
                    <input type="text" {...register('oldPrice')} className={inputClass} placeholder="5990" />
                </div>

                <div>
                    <label className="block text-sm mb-2">Остаток на складе</label>
                    <input type="text" {...register('stock')} className={inputClass} placeholder="15" />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                </div>

                {/* Категория с кнопкой */}
                <div>
                    <label className="block text-sm mb-2">Категория</label>
                    <div className="flex gap-2">
                        <select {...register('categoryId')} className={inputClass}>
                            <option value="">Выберите категорию</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowCategoryModal(true)}
                            className="px-5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Новый
                        </button>
                    </div>
                    {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
                </div>

                {/* Бренд с кнопкой */}
                <div>
                    <label className="block text-sm mb-2">Бренд</label>
                    <div className="flex gap-2">
                        <select {...register('brandId')} className={inputClass}>
                            <option value="">Выберите бренд</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowBrandModal(true)}
                            className="px-5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Новый
                        </button>
                    </div>
                    {errors.brandId && <p className="text-red-500 text-sm mt-1">{errors.brandId.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm mb-2">Описание</label>
                <textarea {...register('description')} rows={6} className={inputClass} placeholder="Подробное описание товара..." />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <ProductImageUpload
                images={images}
                previews={previews}
                onImagesChange={setImages}
                onPreviewsChange={setPreviews}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 transition text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg"
            >
                <Save className="w-5 h-5" />
                {isLoading ? 'Создаём товар...' : 'Создать товар'}
            </button>

            <CategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onSuccess={addNewCategory}
            />

            <BrandModal
                isOpen={showBrandModal}
                onClose={() => setShowBrandModal(false)}
                onSuccess={addNewBrand}
            />
        </form>
    );
}