'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useState } from "react";

import CartQuantityControls from "@/components/CartQuantityControls";
import { getProductImage } from "@/lib/utils/product-image-store";
import type { Product } from "@/lib/mock-products";

export default function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const currentImage = getProductImage(product, currentImageIndex);

    // Безопасное получение бренда и категории
    const brandName = typeof product.brand === 'string'
        ? product.brand
        : product.brand?.name || '';

    const categoryName = typeof product.category === 'string'
        ? product.category
        : product.category?.name || '';

    return (
        <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-yellow-500 transition-all duration-300 hover:-translate-y-1">

            <Link href={`/product/${product.id}`} className="block">
                <div className="relative h-64 bg-zinc-950 overflow-hidden">
                    <Image
                        src={currentImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {discount > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            -{discount}%
                        </div>
                    )}

                    {product.voltage && (
                        <div className="absolute top-4 right-4 bg-black/70 text-yellow-400 text-xs px-2.5 py-1 rounded flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {(product.voltage / 1000000).toFixed(1)}M В
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-yellow-400">
                            {brandName}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                            Арт. {product.article}
                        </span>
                    </div>

                    <div className="text-xs text-zinc-500 mb-2">
                        {categoryName}
                    </div>

                    <h3 className="font-semibold text-lg leading-tight mb-4 line-clamp-2 min-h-[3.2em]">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-5">
                        <span className="text-3xl font-bold text-yellow-400">
                            {product.price.toLocaleString('ru')} ₽
                        </span>
                        {product.oldPrice && (
                            <span className="text-sm line-through text-zinc-500">
                                {product.oldPrice.toLocaleString('ru')} ₽
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 text-sm text-emerald-400 mb-6">
                        {product.stock > 10 ? '✅ В наличии' : '⚠ Осталось мало'}
                    </div>
                </div>
            </Link>

            <div className="px-6 pb-6 pt-2">
                <CartQuantityControls product={product} className="mb-0" />
            </div>
        </div>
    );
}