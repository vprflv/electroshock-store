'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Product } from '@/lib/mock-products';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ProductImage({ product }: { product: Product }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const images = product.images;
    const currentImage = images[currentIndex];

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="space-y-4">
            {/* Основное большое фото */}
            <div
                className="relative aspect-square bg-zinc-950 rounded-3xl overflow-hidden group cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
            >
                <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    priority
                />

                {/* Дисконт */}
                {discount > 0 && (
                    <div className="absolute top-6 left-6 bg-red-500 text-white px-6 py-2 rounded-2xl font-bold text-xl shadow-xl">
                        -{discount}%
                    </div>
                )}

                {/* Кнопки переключения (появляются при наведении) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Индикатор количества фото */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Миниатюры */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all snap-start
                                ${index === currentIndex
                                ? 'border-yellow-400 scale-105'
                                : 'border-zinc-700 hover:border-zinc-500'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`${product.name} ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}