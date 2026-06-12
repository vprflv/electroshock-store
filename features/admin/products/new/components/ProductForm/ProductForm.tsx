'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Save } from 'lucide-react';

import { useCategories } from "@/features/admin/products/new/hooks/useCategories";
import { useBrands } from "@/features/admin/products/new/hooks/useBrands";
import { useSpecs } from "@/features/admin/products/new/hooks/useSpecs";
import { toast } from 'sonner';


import SpecsSelector from "@/features/admin/products/new/components/ProductForm/specs/SpecsSelector";
import ProductImageUpload from "@/features/admin/products/new/components/images/ProductImageUpload";
import CategorySelector from "@/features/admin/products/new/components/ProductForm/category/CategorySelector";
import BrandSelector from "@/features/admin/products/new/components/ProductForm/brands/BrandSelector";

import CategoryModal from "@/features/admin/products/new/components/ProductForm/category/CategoryModal";
import BrandModal from "@/features/admin/products/new/components/ProductForm/brands/BrandModal";
import SpecsModal from "@/features/admin/products/new/components/ProductForm/specs/SpecsModal";
import DeleteCategoryModal from "@/features/admin/products/new/components/ProductForm/category/DeleteCategoryModal";
import DeleteBrandModal from "@/features/admin/products/new/components/ProductForm/brands/DeleteBrandModal";

import { revalidateAllProducts } from "@/features/actions/productActions";
import BasicProductFields from "@/features/admin/products/components/fields/BasicProductFields";
import {ProductFormData, productSchema} from "@/features/admin/types/products-form";





export default function ProductForm() {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { categories, addCategory, refetch: refetchCategories } = useCategories();
    const { brands, addBrand, refetch: refetchBrands } = useBrands();
    const { specs, updateSpecs } = useSpecs();

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showSpecsModal, setShowSpecsModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showDeleteBrandModal, setShowDeleteBrandModal] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: { stock: '0', price: '0', oldPrice: '' },
    });

    const onSubmit = async (data: ProductFormData) => {
        // ... твой текущий onSubmit без изменений
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

        if (specs.length > 0) {
            const specsObj = specs.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>);
            formData.append('specs', JSON.stringify(specsObj));
        }

        images.forEach(file => formData.append('images', file));

        try {
            const res = await fetch('/api/admin/products', { method: 'POST', body: formData });
            if (!res.ok) throw new Error();

            await revalidateAllProducts();
            toast.success('✅ Товар успешно создан!', {
                description: `${data.name} добавлен в каталог`,
            });
            window.location.href = '/admin/products';
        } catch (err: any) {
            toast.error('Ошибка при создании товара', { description: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4 md:px-6 py-6">
            <BasicProductFields register={register} errors={errors} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <CategorySelector
                    categories={categories}
                    register={register}
                    setValue={setValue}
                    onAddNew={() => setShowCategoryModal(true)}
                    onDeleteClick={() => setShowDeleteCategoryModal(true)}
                />

                <BrandSelector
                    brands={brands}
                    register={register}
                    setValue={setValue}
                    onAddNew={() => setShowBrandModal(true)}
                    onDeleteClick={() => setShowDeleteBrandModal(true)}
                />
            </div>

            <SpecsSelector specs={specs} onUpdate={updateSpecs} />

            <div>
                <label className="block text-sm mb-2 font-medium">Описание товара</label>
                <textarea
                    {...register('description')}
                    rows={6}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400 transition resize-y min-h-[140px]"
                    placeholder="Подробное описание товара..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1.5">{errors.description.message}</p>}
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
                className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-400 transition text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg active:scale-[0.985]"
            >
                <Save className="w-5 h-5" />
                {isLoading ? 'Создаём товар...' : 'Создать товар'}
            </button>

            {/* Модалки */}
            <CategoryModal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} onSuccess={addCategory} />
            <DeleteCategoryModal isOpen={showDeleteCategoryModal} onClose={() => setShowDeleteCategoryModal(false)} categories={categories} onDeleted={refetchCategories} />
            <BrandModal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} onSuccess={addBrand} />
            <DeleteBrandModal isOpen={showDeleteBrandModal} onClose={() => setShowDeleteBrandModal(false)} brands={brands} onDeleted={refetchBrands} />
            <SpecsModal isOpen={showSpecsModal} onClose={() => setShowSpecsModal(false)} specs={specs} onSave={updateSpecs} />
        </form>
    );
}