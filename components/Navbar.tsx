'use client';

import Link from 'next/link';
import { ShoppingCart, Shield, Menu } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useState } from 'react';
import SearchBar from '@/features/search/SearchBar';

interface NavbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function Navbar({ searchTerm, onSearchChange }: NavbarProps) {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Логотип */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <span className="font-bold text-2xl tracking-tighter">ElectroShock</span>
                            <span className="text-xs text-zinc-500 block -mt-1">STORE</span>
                        </div>
                    </Link>

                    {/* Поиск — широкий по центру */}
                    <div className="flex-1 max-w-3xl mx-8">
                        <SearchBar
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full"
                        />
                    </div>

                    {/* Корзина */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400
                                       px-6 py-3 rounded-2xl transition-all group"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                            <span className="font-medium hidden sm:inline">Корзина</span>

                            {totalItems() > 0 && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold
                                                w-6 h-6 rounded-full flex items-center justify-center border-2 border-zinc-950">
                                    {totalItems()}
                                </div>
                            )}
                        </Link>

                        {/* Мобильное меню */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-3 text-zinc-300 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Ссылки под поиском */}
                <div className="hidden md:flex items-center justify-center gap-10 pb-4 text-sm font-medium">
                    <Link href="/" className="hover:text-yellow-400 transition-colors">Каталог</Link>
                    <Link href="/#about" className="hover:text-yellow-400 transition-colors">О магазине</Link>
                    <Link href="/#delivery" className="hover:text-yellow-400 transition-colors">Доставка</Link>
                    <Link href="/#contacts" className="hover:text-yellow-400 transition-colors">Контакты</Link>
                </div>
            </div>

            {/* Мобильное меню */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-6">
                    <div className="flex flex-col gap-4 text-lg">
                        <Link href="/" className="py-2 hover:text-yellow-400">Каталог</Link>
                        <Link href="/#about" className="py-2 hover:text-yellow-400">О магазине</Link>
                        <Link href="/#delivery" className="py-2 hover:text-yellow-400">Доставка</Link>
                        <Link href="/#contacts" className="py-2 hover:text-yellow-400">Контакты</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}