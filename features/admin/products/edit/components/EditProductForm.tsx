'use client';

import { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { useEditProduct } from '../hooks/useEditProduct';


import SpecsSelector from "@/features/admin/products/new/components/ProductForm/specs/SpecsSelector";
import EditProductImageUpload from "@/features/admin/products/edit/components/images/EditProductImageUpload";

import CategorySelector from "@/features/admin/products/new/components/ProductForm/category/CategorySelector";
import BrandSelector from "@/features/admin/products/new/components/ProductForm/brands/BrandSelector";

import CategoryModal from "@/features/admin/products/new/components/ProductForm/category/CategoryModal";
import BrandModal from "@/features/admin/products/new/components/ProductForm/brands/BrandModal";
import SpecsModal from "@/features/admin/products/new/components/ProductForm/specs/SpecsModal";
import DeleteCategoryModal from "@/features/admin/products/new/components/ProductForm/category/DeleteCategoryModal";
import DeleteBrandModal from "@/features/admin/products/new/components/ProductForm/brands/DeleteBrandModal";
import BasicProductFields from "@/features/admin/products/components/fields/BasicProductFields";

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
        return (
            <div className="flex items-center justify-center py-20 md:py-32 text-zinc-400">
                Загрузка данных товара...
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4 md:px-6 py-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition self-start"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm md:text-base">Назад к товарам</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left">
                    Редактирование товара
                </h1>
            </div>

            {/* Основные поля */}
            <BasicProductFields
                register={form.register}
                errors={form.formState.errors}
            />

            {/* Категория + Бренд */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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

            {/* Характеристики */}
            <SpecsSelector specs={specs} onUpdate={updateSpecs} />

            {/* Описание */}
            <div>
                <label className="block text-sm mb-2 font-medium">Описание товара</label>
                <textarea
                    {...form.register('description')}
                    rows={6}
                    className={`${inputClass} resize-y min-h-[140px]`}
                    placeholder="Подробное описание товара..."
                />
            </div>

            {/* Изображения */}
            <EditProductImageUpload
                currentImages={currentImages}
                newPreviews={newPreviews}
                onAddNewImages={addNewImages}
                onRemoveCurrent={removeCurrentImage}
                onRemoveNew={removeNewImage}
            />

            {/* Кнопка сохранения */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-400 transition text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg active:scale-[0.985]"
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