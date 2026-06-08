'use client';

import { useProduct } from '@/hooks/queries/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductCartSection from "./components/ProductCartSection";
import ProductDescription from "./components/ProductDescription";
import ProductSpecs from "./components/ProductSpecs";
import ProductFeatures from "./components/ProductFeatures";
import CartModal from "@/features/cart/CartModal";
import ProductDetailSkeleton from "@/features/catalog/product/detail-product/ProductDetailSkeleton";


export default function ProductPageClient({ id }: { id: number }) {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { data: product, isLoading, error } = useProduct(id);

    // ←←← Главное изменение
    if (isLoading || !product) {
        return(<div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <ProductDetailSkeleton />
            </div>)



    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
                <h2 className="text-4xl font-semibold text-red-400">Ошибка загрузки товара</h2>
                <button
                    onClick={() => router.push('/')}
                    className="px-8 py-4 bg-yellow-400 text-black rounded-2xl font-medium hover:bg-yellow-300"
                >
                    ← Вернуться в каталог
                </button>
            </div>
        );
    }

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
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        ← Назад в каталог
                    </button>
                    <div className="text-sm text-zinc-500 font-mono">Арт. {product.article}</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductImage product={normalizedProduct} />
                    <div className="flex flex-col">
                        <ProductInfo product={normalizedProduct} />
                        <ProductSpecs product={normalizedProduct} />
                        <ProductDescription product={normalizedProduct} />
                        <ProductCartSection product={normalizedProduct} onOpenCart={() => setIsCartOpen(true)} />

                        <ProductFeatures product={normalizedProduct} />
                    </div>
                </div>
            </div>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}