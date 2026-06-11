'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

export default function EmptyCart() {
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8">
                <ShoppingBag className="w-12 h-12 text-zinc-500" />
            </div>

            <h2 className="text-3xl font-semibold mb-4">Корзина пуста</h2>
            <p className="text-zinc-400 mb-10 max-w-xs">
                Вы ещё не добавили товары в корзину
            </p>

            <button
                onClick={() => router.push('/')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-2xl transition text-lg"
            >
                Перейти в каталог
            </button>
        </div>
    );
}