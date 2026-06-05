'use client';

import Link from 'next/link';
import { ShoppingCart, Shield, Menu } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useState } from 'react';

export default function Navbar() {
    const { totalItems, items } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Логотип */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-yellow-400 rounded-2xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <span className="font-bold text-2xl tracking-tight">ElectroShock</span>
                            <span className="text-xs text-zinc-500 block -mt-1">STORE</span>
                        </div>
                    </Link>

                     {/*Десктоп меню*/}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="hover:text-yellow-400 transition-colors">
                            Каталог
                        </Link>
                        <Link href="/#about" className="hover:text-yellow-400 transition-colors">
                            О магазине
                        </Link>
                        <Link href="/#delivery" className="hover:text-yellow-400 transition-colors">
                            Доставка
                        </Link>
                        <Link href="/#contacts" className="hover:text-yellow-400 transition-colors">
                            Контакты
                        </Link>
                    </div>

                    {/* Корзина + Мобильное меню */}
                    <div className="flex items-center gap-4">
                        {/* Кнопка корзины */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400 px-5 py-3 rounded-2xl transition-all group relative"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                            <span className="font-medium">Корзина</span>

                            {totalItems() > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                    {totalItems()}
                                </div>
                            )}
                        </Link>

                        {/* Мобильное меню (гамбургер) */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-3"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильное меню */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
                    <div className="px-6 py-6 flex flex-col gap-4">
                        <Link href="/" className="text-lg py-2">Каталог</Link>
                        <Link href="/#about" className="text-lg py-2">О магазине</Link>
                        <Link href="/#delivery" className="text-lg py-2">Доставка</Link>
                        <Link href="/#contacts" className="text-lg py-2">Контакты</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}