'use client';

import Image from 'next/image';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useRouter } from "next/navigation";
import { getMainImage } from '@/lib/utils/product-image';
import {getProductImage} from "@/lib/utils/product-image-store";   // ← добавили

type CartModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-zinc-900 w-full max-w-2xl mx-4 rounded-3xl overflow-hidden">
                {/* Заголовок */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
                    <h2 className="text-2xl font-semibold">Корзина</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="w-6 h-6 hover:text-yellow-400" />
                    </button>
                </div>

                {/* Содержимое */}
                <div className="max-h-[60vh] overflow-auto p-8">
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-2xl text-zinc-400 mb-2">Корзина пуста</p>
                            <p className="text-zinc-500">Добавьте товары из каталога</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                                >
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                        <Image
                                            src={getProductImage(item)}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium leading-tight">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-yellow-400 font-semibold mt-1">
                                            {item.price.toLocaleString('ru')} ₽
                                        </p>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-zinc-700 rounded-2xl">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-4 py-2 hover:bg-zinc-800 rounded-l-2xl"
                                                    disabled={item.quantity === 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-6 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-4 py-2 hover:bg-zinc-800 rounded-r-2xl"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="font-semibold">
                                                {(item.price * item.quantity).toLocaleString('ru')} ₽
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Футер модалки */}
                {items.length > 0 && (
                    <div className="border-t border-zinc-800 p-8">
                        <div className="flex justify-between text-xl mb-6">
                            <span>Итого:</span>
                            <span className="font-bold text-yellow-400">
                                {totalPrice().toLocaleString('ru')} ₽
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    onClose();
                                    router.push('/checkout');
                                }}
                                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-2xl text-lg transition-colors"
                            >
                                Оформить заказ
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full py-4 text-zinc-400 hover:text-red-400 transition-colors"
                            >
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}