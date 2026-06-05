'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProduct } from '@/hooks/queries/products';
import { useState } from 'react';
import CartModal from "@/features/cart/CartModal";
import ProductImage from "@/features/catalog/product/detail-product/ProductImage";
import ProductInfo from "@/features/catalog/product/detail-product/ProductInfo";
import ProductCartSection from "@/features/catalog/product/detail-product/ProductCartSection";
import ProductDescription from "@/features/catalog/product/detail-product/ProductDescription";
import ProductSpecs from "@/features/catalog/product/detail-product/ProductSpecs";
import ProductFeatures from "@/features/catalog/product/detail-product/ProductFeatures";

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const productId = Number(id);

    const { data: product, isLoading } = useProduct(productId);
    const [isCartOpen, setIsCartOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <p className="text-2xl">Загрузка товара...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl font-semibold">Товар не найден</h2>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-yellow-400 text-black rounded-2xl font-medium hover:bg-yellow-300 transition-colors"
                >
                    ← Вернуться в каталог
                </button>
            </div>
        );
    }

    // Нормализуем категорию и бренд для совместимости
    const normalizedProduct = {
        ...product,
        category: product.category?.name || product.category || '',
        brand: product.brand?.name || product.brand || '',
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Верхняя панель */}
            <div className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        ← Назад в каталог
                    </button>
                    <div className="text-sm text-zinc-500 font-mono">
                        Арт. {product.article}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Левая колонка - изображение */}
                    <ProductImage product={normalizedProduct} />

                    {/* Правая колонка - вся информация */}
                    <div className="flex flex-col">
                        <ProductInfo product={normalizedProduct} />

                        {/* Блок с корзиной */}
                        <ProductCartSection
                            product={normalizedProduct}
                            onOpenCart={() => setIsCartOpen(true)}
                        />

                        {/* Остальной контент */}
                        <ProductDescription product={normalizedProduct} />
                        <ProductSpecs product={normalizedProduct} />
                        <ProductFeatures product={normalizedProduct} />
                    </div>
                </div>
            </div>

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}