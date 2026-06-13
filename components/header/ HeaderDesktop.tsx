'use client';

import Link from "next/link";
import { Shield, ShoppingCart, Phone } from 'lucide-react';
import CallbackButton from '@/features/callback/CallbackButton';   // ← наша кнопка

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

            {/* Верхняя строка — Телефон + Кнопка "Перезвоните мне" */}
            <div className="max-w-7xl pb-10 mx-auto px-6 py-3 flex items-center justify-end gap-8 text-sm">

                {/* Номер телефона */}
                <p
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                    <Phone className="w-5 h-5 hover:text-yellow-400" />
                    <span className="font-medium">8 (800) 555-35-35</span>
                </p>

                {/* Кнопка "Перезвоните мне" рядом с номером */}
                <CallbackButton />

            </div>

            {/* Нижняя строка — Логотип + меню + корзина */}
            <div className="max-w-7xl mx-auto px-6 pb-5">
                <div className="flex items-center h-16">


                    <Link href="/" className="flex mb-8 items-center gap-3 flex-shrink-0 group relative">

                        {/* Оса — независимая и всегда в нужном положении */}
                        <img
                            src="/logo.png"
                            alt="ElectroShock"
                            className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain
                   drop-shadow-[0_0_2px_#facc15]
                   absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-14
                   -left-2 sm:-left-3 md:-left-4 transition-all duration-300 z-10"
                        />

                        {/* Текст — остаётся на месте */}
                        <div className="flex ml-8 flex-col pt-4 sm:pt-5 md:pt-6">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-yellow-400 leading-none">
                                ОСА
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-500 font-medium tracking-widest">
                                ОРУЖИЕ ДЛЯ САМООБОРОНЫ
                            </div>
                        </div>
                    </Link>

                    {/* Меню по центру */}
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-10 text-sm font-medium">
                            <Link href="/" className="hover:text-yellow-400 transition-colors">Каталог</Link>
                            <Link href="/#about" className="hover:text-yellow-400 transition-colors">О магазине</Link>
                            <Link href="/#delivery" className="hover:text-yellow-400 transition-colors">Доставка</Link>
                            <Link href="/#contacts" className="hover:text-yellow-400 transition-colors">Контакты</Link>
                        </div>
                    </div>

                    {/* Корзина */}
                    <button
                        onClick={onCartClick}
                        className="relative p-3.5 rounded-2xl transition-all active:scale-95 group ml-8"
                    >
                        <ShoppingCart className="w-7 h-7 text-zinc-300 group-hover:text-yellow-400 transition-colors" />

                        <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-md" />

                        {isMounted && totalItems > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg ring-2 ring-red-500/30 border border-zinc-950">
                                {totalItems}
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}