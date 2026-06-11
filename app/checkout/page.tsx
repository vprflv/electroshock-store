'use client';

import { Suspense } from 'react';
import {useCheckout} from "@/features/checkout/hooks/useCheckout";
import EmptyCart from "@/features/checkout/components/EmptyCart";
import CheckoutForm from "@/features/checkout/components/CheckoutForm";


function CheckoutContent() {
    const checkout = useCheckout();

    // Если корзина пустая — показываем специальный экран
    if (checkout.items.length === 0) {
        return <EmptyCart />;
    }

    return <CheckoutForm />;
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<CheckoutLoading />}>
            <div className="min-h-screen bg-zinc-950 text-white pb-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
                    <CheckoutContent />
                </div>
            </div>
        </Suspense>
    );
}

function CheckoutLoading() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="text-yellow-400 text-lg">Загрузка...</div>
        </div>
    );
}