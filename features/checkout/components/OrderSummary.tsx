'use client';

import Image from 'next/image';
import { getProductImage } from "@/lib/utils/product-image-store";
import { Trash2 } from 'lucide-react';

type OrderSummaryProps = {
    items: any[];
    totalPrice: number;
    onRemove?: (id: number) => void;   // ← уже есть
};

export default function OrderSummary({ items, totalPrice, onRemove }: OrderSummaryProps) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 lg:sticky lg:top-8">
            <h3 className="text-xl font-semibold mb-6">Ваш заказ</h3>

            <div className="space-y-6 max-h-[460px] overflow-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                            <Image
                                src={getProductImage(item)}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium leading-tight line-clamp-2">{item.name}</h4>
                            <p className="text-yellow-400 font-semibold mt-1">
                                {item.price.toLocaleString('ru')} ₽ × {item.quantity}
                            </p>
                        </div>

                        {/* Кнопка удаления */}
                        {onRemove && (
                            <button
                                onClick={() => onRemove(item.id)}
                                className="text-red-500 hover:text-red-400 self-start mt-1 p-1"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="border-t border-zinc-700 mt-8 pt-6">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Итого к оплате:</span>
                    <span className="text-yellow-400">
                        {totalPrice.toLocaleString('ru')} ₽
                    </span>
                </div>
            </div>
        </div>
    );
}