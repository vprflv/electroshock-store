'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '../hooks/useCheckout';
import OrderSummary from "@/features/checkout/components/OrderSummary";

export default function CheckoutForm() {
    const router = useRouter();
    const checkout = useCheckout();

    const {
        formData,
        deliveryNeeded,
        deliveryType,
        paymentType,
        isSubmitting,
        handleChange,
        handleSubmit,
        setDeliveryNeeded,
        setDeliveryType,
        setPaymentType,
    } = checkout;

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
                            : `Подтвердить заказ — ${checkout.totalPrice.toLocaleString('ru')} ₽`}
                    </button>
                </form>
            </div>

            {/* Правая колонка — состав заказа */}
            <div className="lg:col-span-2">
                {/* Будем выносить позже */}
                <OrderSummary
                    items={checkout.items}
                    totalPrice={checkout.totalPrice}
                    onRemove={checkout.removeFromCart}
                />
            </div>
        </div>
    );
}