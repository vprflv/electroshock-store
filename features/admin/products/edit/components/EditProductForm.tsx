'use client';

import { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { useEditProduct } from '../hooks/useEditProduct';

import SpecsSelector from "@/features/admin/products/new/components/ProductForm/specs/SpecsSelector";
import ProductImageUpload from "@/features/admin/products/new/components/images/ProductImageUpload";

import CategorySelector from "@/features/admin/products/new/components/ProductForm/category/CategorySelector";
import BrandSelector from "@/features/admin/products/new/components/ProductForm/brands/BrandSelector";

import CategoryModal from "@/features/admin/products/new/components/ProductForm/category/CategoryModal";
import BrandModal from "@/features/admin/products/new/components/ProductForm/brands/BrandModal";
import SpecsModal from "@/features/admin/products/new/components/ProductForm/specs/SpecsModal";

import DeleteCategoryModal from "@/features/admin/products/new/components/ProductForm/category/DeleteCategoryModal";
import DeleteBrandModal from "@/features/admin/products/new/components/ProductForm/brands/DeleteBrandModal";
import EditProductImageUpload from "@/features/admin/products/edit/components/images/EditProductImageUpload";

type Props = {
    productId: number;
};

export default function EditProductForm({ productId }: Props) {
    const {
        form,
        inputClass,
        currentImages,
        newPreviews,
        isLoading,
        initialLoading,
        onSubmit,
        categories,
        brands,
        specs,
        updateSpecs,
        addCategory,
        addBrand,
        refetchCategories,
        refetchBrands,

        addNewImages,
        removeCurrentImage,
        removeNewImage,
    } = useEditProduct(productId);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showSpecsModal, setShowSpecsModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showDeleteBrandModal, setShowDeleteBrandModal] = useState(false);

    if (initialLoading) {
        return <div className="text-center py-32 text-xl text-zinc-400">Загрузка данных товара...</div>;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/admin/products" className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                    <ArrowLeft className="w-5 h-5" />
                    Назад к товарам
                </Link>
                <h1 className="text-3xl font-bold">Редактирование товара</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Поля формы */}
                <div>
                    <label className="block text-sm mb-2">Артикул</label>
                    <input {...form.register('article')} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Название товара</label>
                    <input {...form.register('name')} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Цена (₽)</label>
                    <input type="text" {...form.register('price')} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Старая цена</label>
                    <input type="text" {...form.register('oldPrice')} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Остаток на складе</label>
                    <input type="text" {...form.register('stock')} className={inputClass} />
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
                    className={inputClass}
                    placeholder="Подробное описание товара..."
                />
            </div>

            {/* ← Здесь изображения */}
            <EditProductImageUpload
                currentImages={currentImages}
                newPreviews={newPreviews}
                onAddNewImages={addNewImages}
                onRemoveCurrent={removeCurrentImage}
                onRemoveNew={removeNewImage}
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
            <CategoryModal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} onSuccess={addCategory} />
            <DeleteCategoryModal isOpen={showDeleteCategoryModal} onClose={() => setShowDeleteCategoryModal(false)} categories={categories} onDeleted={refetchCategories} />
            <BrandModal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} onSuccess={addBrand} />
            <DeleteBrandModal isOpen={showDeleteBrandModal} onClose={() => setShowDeleteBrandModal(false)} brands={brands} onDeleted={refetchBrands} />
            <SpecsModal isOpen={showSpecsModal} onClose={() => setShowSpecsModal(false)} specs={specs} onSave={updateSpecs} />
        </form>
    );
}