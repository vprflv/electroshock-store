'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductImage } from "@/lib/utils/product-image-store";

export default function ProductImage({ product }: { product: any }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const imagesCount = product.imagePaths?.length || product.images?.length || 0;
    const currentImage = getProductImage(product, currentIndex);

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? imagesCount - 1 : prev - 1));
    const goToNext = () => setCurrentIndex((prev) => (prev === imagesCount - 1 ? 0 : prev + 1));

    return (
        <div className="space-y-6">
            {/* Основное фото */}
            <div className="relative aspect-square bg-zinc-950 rounded-3xl overflow-hidden group cursor-zoom-in"
                 onClick={() => setIsZoomed(true)}>

                <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    priority
                />

                {discount > 0 && (
                    <div className="absolute top-6 left-6 bg-red-600 text-white px-5 py-2 rounded-2xl font-bold text-xl shadow-2xl">
                        -{discount}%
                    </div>
                )}

                {/* Кнопки навигации */}
                {imagesCount > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Миниатюры — новая версия */}
            {imagesCount > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {Array.from({ length: imagesCount }).map((_, index) => {
                        const thumbSrc = getProductImage(product, index);
                        const isActive = index === currentIndex;

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start
                                    ${isActive
                                    ? 'border-yellow-400 scale-110 shadow-xl shadow-yellow-500/30'
                                    : 'border-zinc-700 hover:border-zinc-400 hover:scale-105'
                                }`}
                            >
                                <Image
                                    src={thumbSrc}
                                    alt={`${product.name} превью ${index + 1}`}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                                {isActive && (
                                    <div className="absolute inset-0 ring-2 ring-yellow-400/60 rounded-2xl" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}