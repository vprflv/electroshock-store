'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { useCategories } from "@/features/admin/products/new/hooks/useCategories";
import { useBrands } from "@/features/admin/products/new/hooks/useBrands";
import { useSpecs } from "@/features/admin/products/new/hooks/useSpecs";



import CategorySelector from "@/features/admin/products/new/components/ProductForm/category/CategorySelector";
import BrandSelector from "@/features/admin/products/new/components/ProductForm/brands/BrandSelector";



import DeleteCategoryModal from "@/features/admin/products/new/components/ProductForm/category/DeleteCategoryModal";
import DeleteBrandModal from "@/features/admin/products/new/components/ProductForm/brands/DeleteBrandModal";

import { revalidateAllProducts } from "@/features/actions/productActions";
import SpecsSelector from "@/features/admin/products/new/components/ProductForm/specs/SpecsSelector";
import ProductImageUpload from "@/features/admin/products/new/components/images/ProductImageUpload";
import CategoryModal from "@/features/admin/products/new/components/ProductForm/category/CategoryModal";
import BrandModal from "@/features/admin/products/new/components/ProductForm/brands/BrandModal";
import SpecsModal from "@/features/admin/products/new/components/ProductForm/specs/SpecsModal";

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

type Props = {
    productId: number;
};

export default function EditProductForm({ productId }: Props) {
    const [images, setImages] = useState<File[]>([]);                    // Новые файлы
    const [previews, setPreviews] = useState<string[]>([]);              // Превью новых
    const [existingImages, setExistingImages] = useState<string[]>([]);  // Уже сохранённые изображения
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Хуки
    const { categories, addCategory, refetch: refetchCategories } = useCategories();
    const { brands, addBrand, refetch: refetchBrands } = useBrands();
    const { specs, updateSpecs } = useSpecs();

    // Модалки
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showSpecsModal, setShowSpecsModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showDeleteBrandModal, setShowDeleteBrandModal] = useState(false);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            stock: '0',
            price: '0',
            oldPrice: '',
        },
    });

    // Загрузка данных товара
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await fetch(`/api/admin/products/${productId}`);
                if (!res.ok) throw new Error('Не удалось загрузить товар');

                const product = await res.json();

                setExistingImages(product.images || []);

                form.reset({
                    name: product.name,
                    article: product.article,
                    price: product.price.toString(),
                    oldPrice: product.oldPrice?.toString() || '',
                    stock: product.stock.toString(),
                    description: product.description,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                });

                // Загружаем характеристики
                if (product.specs) {
                    const specArray = Object.entries(product.specs).map(([key, value]) => ({
                        key,
                        value: String(value),
                    }));
                    updateSpecs(specArray);
                }
            } catch (err) {
                toast.error('Ошибка загрузки товара');
            } finally {
                setInitialLoading(false);
            }
        };

        loadProduct();
    }, [productId, form, updateSpecs]);

    const onSubmit = async (data: ProductFormData) => {
        setIsLoading(true);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value);
        });

        if (specs.length > 0) {
            const specsObj = specs.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>);
            formData.append('specs', JSON.stringify(specsObj));
        }

        // Новые изображения
        images.forEach(file => formData.append('images', file));

        try {
            const res = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Ошибка обновления');
            }

            await revalidateAllProducts();
            toast.success('✅ Товар успешно обновлён!');
            window.location.href = '/admin/products';
        } catch (err: any) {
            toast.error(err.message || 'Произошла ошибка при сохранении');
        } finally {
            setIsLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="text-xl text-zinc-400">Загрузка данных товара...</div>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Назад к товарам
                </Link>
                <h1 className="text-3xl font-bold">Редактирование товара</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Артикул</label>
                    <input {...form.register('article')} className="inputClass" />
                </div>

                <div>
                    <label className="block text-sm mb-2">Название товара</label>
                    <input {...form.register('name')} className="inputClass" />
                </div>

                <div>
                    <label className="block text-sm mb-2">Цена (₽)</label>
                    <input type="text" {...form.register('price')} className="inputClass" />
                </div>

                <div>
                    <label className="block text-sm mb-2">Старая цена (необязательно)</label>
                    <input type="text" {...form.register('oldPrice')} className="inputClass" />
                </div>

                <div>
                    <label className="block text-sm mb-2">Остаток на складе</label>
                    <input type="text" {...form.register('stock')} className="inputClass" />
                </div>

                <CategorySelector
                    categories={categories}
                    register={form.register}
                    setValue={form.setValue}
                    onAddNew={() => setShowCategoryModal(true)}
                    onDeleteClick={() => setShowDeleteCategoryModal(true)}
                />

                <BrandSelector
                    brands={brands}
                    register={form.register}
                    setValue={form.setValue}
                    onAddNew={() => setShowBrandModal(true)}
                    onDeleteClick={() => setShowDeleteBrandModal(true)}
                />
            </div>

            <SpecsSelector specs={specs} onUpdate={updateSpecs} />

            <div>
                <label className="block text-sm mb-2">Описание</label>
                <textarea
                    {...form.register('description')}
                    rows={6}
                    className="inputClass"
                    placeholder="Подробное описание товара..."
                />
            </div>

            <ProductImageUpload
                images={images}
                previews={previews}
                existingImages={existingImages}
                onImagesChange={setImages}
                onPreviewsChange={setPreviews}
                onExistingImagesChange={setExistingImages}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 transition text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg"
            >
                <Save className="w-5 h-5" />
                {isLoading ? 'Сохраняем изменения...' : 'Сохранить изменения'}
            </button>

            {/* Модалки */}
            <CategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onSuccess={addCategory}
            />

            <DeleteCategoryModal
                isOpen={showDeleteCategoryModal}
                onClose={() => setShowDeleteCategoryModal(false)}
                categories={categories}
                onDeleted={refetchCategories}
            />

            <BrandModal
                isOpen={showBrandModal}
                onClose={() => setShowBrandModal(false)}
                onSuccess={addBrand}
            />

            <DeleteBrandModal
                isOpen={showDeleteBrandModal}
                onClose={() => setShowDeleteBrandModal(false)}
                brands={brands}
                onDeleted={refetchBrands}
            />

            <SpecsModal
                isOpen={showSpecsModal}
                onClose={() => setShowSpecsModal(false)}
                specs={specs}
                onSave={updateSpecs}
            />
        </form>
    );
}