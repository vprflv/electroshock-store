'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getMainImage } from '@/lib/utils/product-image';   // ← добавили

export default function CheckoutPage() {
    const { items, removeFromCart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: 'Москва',
        comment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Здесь будет отправка на бэкенд позже
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert('✅ Заказ успешно оформлен! (пока мок)');
        clearCart();
        router.push('/'); // потом заменишь на /order/success/[id]
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
                <h2 className="text-3xl font-semibold mb-4">Корзина пуста</h2>
                <button
                    onClick={() => router.push('/')}
                    className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-medium"
                >
                    Перейти в каталог
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="max-w-6xl mx-auto px-6 pt-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Назад
                </button>

                <h1 className="text-4xl font-bold mb-10">Оформление заказа</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Левая колонка — форма */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Контактные данные</h2>
                                <div className="space-y-5">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="ФИО"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Телефон (+7 ...)"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Адрес доставки"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400"
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Комментарий к заказу</h2>
                                <textarea
                                    name="comment"
                                    placeholder="Дополнительная информация (подъезд, этаж, домофон...)"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 focus:outline-none focus:border-yellow-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-semibold text-xl py-5 rounded-3xl transition-colors"
                            >
                                {isSubmitting ? 'Оформляем заказ...' : `Оплатить ${totalPrice().toLocaleString('ru')} ₽`}
                            </button>
                        </form>
                    </div>

                    {/* Правая колонка — заказ */}
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-8">
                            <h3 className="text-xl font-semibold mb-6">Ваш заказ</h3>

                            <div className="space-y-6 max-h-[500px] overflow-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={getMainImage(item)}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium leading-tight">{item.name}</h4>
                                            <p className="text-yellow-400 font-semibold mt-1">
                                                {item.price.toLocaleString('ru')} ₽ × {item.quantity}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-400 self-start"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-zinc-700 mt-8 pt-6">
                                <div className="flex justify-between text-lg">
                                    <span>Итого:</span>
                                    <span className="font-bold text-yellow-400">
                                        {totalPrice().toLocaleString('ru')} ₽
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}