'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import OrderSummary from "@/features/checkout/components/OrderSummary";
import Link from "next/link";

export default function CheckoutForm() {
    const router = useRouter();
    const checkout = useCheckout();
    const [agreePolicy, setAgreePolicy] = useState(false);

    const {
        formData,
        deliveryNeeded,
        deliveryType,
        isSubmitting,
        handleChange,
        handleSubmit,
        setDeliveryNeeded,
        setDeliveryType,
    } = checkout;

    const isFormValid = agreePolicy &&
        formData.fullName.trim() &&
        formData.phone.trim() &&
        formData.email.trim() &&
        (!deliveryNeeded || deliveryType !== 'courier' || formData.address.trim());

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Левая колонка — форма */}
            <div className="lg:col-span-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Назад
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold mb-8">Оформление заказа</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Контактные данные */}
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
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Доставка */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Способ получения</h2>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => setDeliveryType('courier')}
                                className={`py-4 rounded-2xl border transition-all text-base font-medium
                ${deliveryType === 'courier'
                                    ? 'border-yellow-400 bg-yellow-400/10 text-white'
                                    : 'border-zinc-700 hover:border-zinc-600'}`}
                            >
                                Курьер
                            </button>

                            <button
                                type="button"
                                onClick={() => setDeliveryType('pickup')}
                                className={`py-4 rounded-2xl border transition-all text-base font-medium
                ${deliveryType === 'pickup'
                                    ? 'border-yellow-400 bg-yellow-400/10 text-white'
                                    : 'border-zinc-700 hover:border-zinc-600'}`}
                            >
                               Самовывоз
                            </button>
                        </div>

                        {/* Поле адреса показывается только при выборе курьера */}
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

                    {/* Комментарий */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Комментарий к заказу</h2>
                        <textarea
                            name="comment"
                            placeholder="Подъезд, этаж, домофон, пожелания..."
                            value={formData.comment}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-5 py-4 text-base focus:outline-none focus:border-yellow-400"
                        />
                    </div>

                    {/* ==================== MOBILE ORDER SUMMARY ==================== */}
                    <div className="lg:hidden pt-4 pb-6 border-t border-zinc-800">
                        <OrderSummary
                            items={checkout.items}
                            totalPrice={checkout.totalPrice}
                            onRemove={checkout.removeFromCart}
                        />
                    </div>

                    {/* Согласие с политикой */}
                    <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            {/* Согласие с политикой */}
                            <div className="pt-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={agreePolicy}
                                        onChange={(e) => setAgreePolicy(e.target.checked)}
                                        className="mt-1 w-5 h-5 accent-yellow-400"
                                        required
                                    />
                                    <span className="text-sm text-zinc-400">
                                                 Я согласен с{' '}
                                        <Link
                                            href="/policy/privacy"
                                            target="_blank"
                                            className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                                        >
                                        политикой конфиденциальности
                                         </Link>{' '}
                                        и условиями обработки персональных данных
                                        </span>
                                </label>
                            </div>
                        </label>
                    </div>

                    {/* Кнопка для мобильных */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className="lg:hidden w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-semibold text-xl py-5 rounded-3xl transition-colors mt-2"
                    >
                        {isSubmitting
                            ? 'Оформляем заказ...'
                            : `Подтвердить заказ — ${checkout.totalPrice.toLocaleString('ru')} ₽`}
                    </button>

                    {/* Кнопка для десктопа */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className="hidden lg:block w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-semibold text-xl py-5 rounded-3xl transition-colors"
                    >
                        {isSubmitting
                            ? 'Оформляем заказ...'
                            : `Подтвердить заказ — ${checkout.totalPrice.toLocaleString('ru')} ₽`}
                    </button>
                </form>
            </div>

            {/* Правая колонка — только на больших экранах */}
            <div className="hidden lg:block lg:col-span-2">
                <OrderSummary
                    items={checkout.items}
                    totalPrice={checkout.totalPrice}
                    onRemove={checkout.removeFromCart}
                />
            </div>
        </div>
    );
}