'use client';

import Link from "next/link";
import {ShoppingCart, Menu, X, SlidersHorizontal} from 'lucide-react';
import { useState } from 'react';

interface HeaderMobileProps {
    onCartClick: () => void;
    totalItems: number;
    isMounted: boolean;
    onFiltersClick: () => void;
}

export default function HeaderMobile({
                                         onCartClick,
                                         totalItems,
                                         isMounted,
                                         onFiltersClick
                                     }: HeaderMobileProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="lg:hidden border-b border-zinc-950 bg-zinc-950">
            {/* Верхняя строка: Логотип + Бургер */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
                {/* Логотип с осой */}
                <Link href="/" className="flex items-center gap-3 relative flex-shrink-0">
                    <img
                        src="/logo.png"
                        alt="ElectroShock"
                        className="h-11 w-auto object-contain drop-shadow-[0_0_3px_#facc15] -mt-1 z-10"
                    />
                    <div className="flex flex-col -space-y-0.5">
                        <div className="text-2xl font-black tracking-tighter text-yellow-400 leading-none">
                            О-СА
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium tracking-widest">
                            ОРУЖИЕ ДЛЯ САМООБОРОНЫ
                        </div>
                    </div>
                </Link>

                {/* Бургер */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 text-zinc-300 hover:text-white transition-colors"
                >
                    <Menu className="w-7 h-7 text-yellow-400" />
                </button>
            </div>


            {/* Вторая строка — Фильтры + Корзина */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950">
                <button
                    onClick={onFiltersClick}
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-700 border border-zinc-700 rounded-2xl transition-all active:scale-95"
                >
                    <SlidersHorizontal className="w-5 h-5 text-yellow-400" />
                </button>

                <button onClick={onCartClick} className="relative p-3 active:scale-95 transition-transform">
                    <ShoppingCart className="w-6 h-6 text-yellow-400" />
                    {isMounted && totalItems > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-zinc-950 border border-zinc-900">
                            {totalItems}
                        </div>
                    )}
                </button>
            </div>

            {/* ==================== МОБИЛЬНОЕ МЕНЮ ==================== */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                        <div className="text-xl font-bold text-yellow-400">Меню</div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-zinc-400 hover:text-white"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="flex flex-col p-6 space-y-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="hover:text-yellow-400 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Каталог
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-yellow-400 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            О магазине
                        </Link>
                        <Link
                            href="/delivery"
                            className="hover:text-yellow-400 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Доставка
                        </Link>
                        <Link
                            href="/contacts"
                            className="hover:text-yellow-400 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Контакты
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}