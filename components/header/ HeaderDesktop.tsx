'use client';

import Link from "next/link";
import { Shield, ShoppingCart, Phone } from 'lucide-react';

interface HeaderDesktopProps {
    onCartClick: () => void;
    totalItems: number;
    isMounted: boolean;
}

export default function HeaderDesktop({
                                          onCartClick,
                                          totalItems,
                                          isMounted,
                                      }: HeaderDesktopProps) {
    return (
        <div className="hidden lg:block border-b border-zinc-800 bg-zinc-950">

            {/* Верхняя строка — только телефон */}
            <div className="max-w-7xl mx-auto pt-5 pb-10 px-6 py-3 flex justify-end text-sm">
                <a href="tel:+78005553535" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">8 (800) 555-35-35</span>
                </a>
            </div>

            {/* Нижняя строка — Логотип + Ссылки + Корзина */}
            <div className="max-w-7xl mx-auto px-6 pb-5">
                <div className="flex items-center h-16">

                    {/* Логотип слева */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <Shield className="w-9 h-9 text-yellow-400" />
                        <div className="font-bold text-2xl tracking-tighter">
                            ELECTRO<span className="text-yellow-400">SHOCK</span>
                        </div>
                    </Link>

                    {/* Ссылки по центру */}
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-10 text-sm font-medium">
                            <Link href="/" className="hover:text-yellow-400 transition-colors">Каталог</Link>
                            <Link href="/#about" className="hover:text-yellow-400 transition-colors">О магазине</Link>
                            <Link href="/#delivery" className="hover:text-yellow-400 transition-colors">Доставка</Link>
                            <Link href="/#contacts" className="hover:text-yellow-400 transition-colors">Контакты</Link>
                        </div>
                    </div>

                    {/* Корзина справа */}
                    <button
                        onClick={onCartClick}
                        className="relative p-3.5 rounded-2xl transition-all active:scale-95 group ml-8"
                    >
                        <ShoppingCart className="w-7 h-7 text-zinc-300 group-hover:text-yellow-400 transition-colors" />

                        <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 opacity-0
                                        group-hover:opacity-100 transition-all duration-300 -z-10 blur-md" />

                        {isMounted && totalItems > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold
                                            w-6 h-6 rounded-full flex items-center justify-center
                                            shadow-lg ring-2 ring-red-500/30 border border-zinc-950">
                                {totalItems}
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}