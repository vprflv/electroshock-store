'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getMainImage } from '@/lib/utils/product-image';
import {getProductImage} from "@/lib/utils/product-image-store";

type DeliveryType = 'courier' | 'pickup';
type PaymentType = 'online' | 'cash';

export default function CheckoutPage() {
    const { items, removeFromCart, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: 'Москва',
        address: '',
        comment: '',
    });

    const [deliveryNeeded, setDeliveryNeeded] = useState(true);
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('courier');
    const [paymentType, setPaymentType] = useState<PaymentType>('online');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        alert('✅ Заказ успешно оформлен!');
        clearCart();
        router.push('/');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
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
        <div className="min-h-screen bg-zinc-950 text-white pb-28"> {/* увеличил отступ снизу под плавающий блок */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Назад
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold mb-8">Оформление заказа</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Левая колонка — форма */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Контактные данные</h2>
                                <div className="space-y-5">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="ФИО *"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Телефон *"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Доставка */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Доставка</h2>
                                <div className="flex gap-4 mb-5">
                                    <label className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 cursor-pointer hover:border-yellow-400 transition-colors flex-1">
                                        <input
                                            type="checkbox"
                                            checked={deliveryNeeded}
                                            onChange={(e) => setDeliveryNeeded(e.target.checked)}
                                        />
                                        <span>Нужна доставка</span>
                                    </label>
                                </div>

                                {deliveryNeeded && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryType('courier')}
                                                className={`py-4 rounded-2xl border transition-all text-base ${deliveryType === 'courier' ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-700'}`}
                                            >
                                                Курьер
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryType('pickup')}
                                                className={`py-4 rounded-2xl border transition-all text-base ${deliveryType === 'pickup' ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-700'}`}
                                            >
                                                Самовывоз
                                            </button>
                                        </div>

                                        {deliveryType === 'courier' && (
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Адрес доставки *"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Способ оплаты */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Способ оплаты</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentType('online')}
                                        className={`py-4 rounded-2xl border transition-all text-base ${paymentType === 'online' ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-700'}`}
                                    >
                                        Оплата онлайн
                                    </button>
                                    {deliveryType === 'pickup' && (
                                        <button
                                            type="button"
                                            onClick={() => setPaymentType('cash')}
                                            className={`py-4 rounded-2xl border transition-all text-base ${paymentType === 'cash' ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-700'}`}
                                        >
                                            При получении
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Комментарий */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Комментарий</h2>
                                <textarea
                                    name="comment"
                                    placeholder="Подъезд, этаж, домофон, пожелания..."
                                    value={formData.comment}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                                />
                            </div>

                            {/* Кнопка для десктопа */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="hidden lg:block w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-semibold text-xl py-5 rounded-3xl transition-colors"
                            >
                                {isSubmitting
                                    ? 'Оформляем заказ...'
                                    : `Подтвердить заказ — ${totalPrice().toLocaleString('ru')} ₽`}
                            </button>
                        </form>
                    </div>

                    {/* Правая колонка — состав заказа */}
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 lg:sticky lg:top-8">
                            <h3 className="text-xl font-semibold mb-6">Ваш заказ</h3>

                            <div className="space-y-6 max-h-[460px] overflow-auto pr-2">
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
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-400 self-start mt-1"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-zinc-700 mt-8 pt-6">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Итого к оплате:</span>
                                    <span className="text-yellow-400">
                                        {totalPrice().toLocaleString('ru')} ₽
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Плавающий блок "Итого + кнопка" только для мобильных */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                        {totalPrice().toLocaleString('ru')} ₽
                    </span>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-semibold text-lg py-4 rounded-2xl transition-colors"
                >
                    {isSubmitting ? 'Оформляем заказ...' : 'Подтвердить заказ'}
                </button>
            </div>
        </div>
    );
}