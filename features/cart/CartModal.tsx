'use client';

import Image from 'next/image';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useRouter } from "next/navigation";
import { getProductImage } from "@/lib/utils/product-image-store";

type CartModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <>
            {/* ==================== МОБИЛЬНАЯ ВЕРСИЯ (Bottom Sheet) ==================== */}
            <div className="lg:hidden fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm">
                <div className="bg-zinc-900 w-full rounded-t-3xl max-h-[88vh] flex flex-col">
                    {/* Шапка */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
                        <h2 className="text-xl font-semibold">Корзина ({items.length})</h2>
                        <button onClick={onClose} className="p-2 -mr-2 text-zinc-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Содержимое */}
                    <div className="flex-1 overflow-auto p-5 space-y-4">
                        {items.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-2xl text-zinc-400 mb-3">Корзина пуста</p>
                                <p className="text-zinc-500">Добавьте товары из каталога</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                                        <Image
                                            src={getProductImage(item)}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium leading-tight pr-2 text-base">
                                                {item.name}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-400 p-1 -mr-1"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-yellow-400 font-semibold mt-1 text-base">
                                            {item.price.toLocaleString('ru')} ₽
                                        </p>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Внутри CartModal — блок с количеством */}
                                            <div className="flex items-center border border-zinc-700 rounded-2xl">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-800 rounded-l-2xl active:bg-zinc-800 text-sm"
                                                    disabled={item.quantity === 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-5 sm:px-6 font-medium text-base">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-800 rounded-r-2xl active:bg-zinc-800 text-sm"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="font-semibold text-base">
                                                {(item.price * item.quantity).toLocaleString('ru')} ₽
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Футер */}
                    {items.length > 0 && (
                        <div className="border-t border-zinc-800 p-5 bg-zinc-900">
                            <div className="flex justify-between text-xl mb-5">
                                <span>Итого:</span>
                                <span className="font-bold text-yellow-400">
                                    {totalPrice().toLocaleString('ru')} ₽
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    onClose();
                                    router.push('/checkout');
                                }}
                                className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500
               text-black font-semibold py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg transition-colors"
                            >
                                Оформить заказ
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full py-3.5 text-zinc-400 hover:text-red-400 text-sm font-medium"
                            >
                                Очистить корзину
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ==================== ДЕСКТОП ВЕРСИЯ (Модальное окно) ==================== */}
            <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-zinc-900 w-full max-w-2xl mx-4 rounded-3xl overflow-hidden">
                    {/* Заголовок */}
                    <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
                        <h2 className="text-2xl font-semibold">Корзина ({items.length})</h2>
                        <button onClick={onClose} className="text-zinc-400 hover:text-white">
                            <X className="w-6 h-6 hover:text-yellow-400" />
                        </button>
                    </div>

                    {/* Содержимое */}
                    <div className="max-h-[60vh] overflow-auto p-8 space-y-6">
                        {items.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-2xl text-zinc-400 mb-2">Корзина пуста</p>
                                <p className="text-zinc-500">Добавьте товары из каталога</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-5"
                                >
                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                                        <Image
                                            src={getProductImage(item)}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium leading-tight text-lg">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-yellow-400 font-semibold mt-1 text-lg">
                                            {item.price.toLocaleString('ru')} ₽
                                        </p>

                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center border border-zinc-700 rounded-2xl">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-5 py-3 hover:bg-zinc-800 rounded-l-2xl"
                                                    disabled={item.quantity === 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-7 font-medium text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-5 py-3 hover:bg-zinc-800 rounded-r-2xl"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="font-semibold text-lg">
                                                {(item.price * item.quantity).toLocaleString('ru')} ₽
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Футер */}
                    {items.length > 0 && (
                        <div className="border-t border-zinc-800 p-8">
                            <div className="flex justify-between text-2xl mb-6">
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
                                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-2xl text-xl transition-colors"
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
        </>
    );
}