'use client';

import { useState } from 'react';
import { Shield, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { useCart } from "@/store/useCart";
import CartModal from "@/features/cart/CartModal";
import SearchBar from "@/features/search/SearchBar";
import Catalog from "@/features/catalog/Catalog";
import { useDebounce } from "@/hooks/useDebounce";
import { useMounted } from "@/hooks/useMounted";
import Navbar from "@/components/Navbar";

export default function HomeClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 350);
    const { totalItems } = useCart();
    const isMounted = useMounted();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* HERO */}
            {/*<header className="py-24 ">*/}
            {/*    <div className="max-w-6xl mx-auto px-6 text-center">*/}
            {/*        <div className="flex justify-center mb-6">*/}
            {/*            <Shield className="w-24 h-24 text-yellow-400*/}
            {/*       drop-shadow-[0_0_20px_#fcd34d]*/}
            {/*       drop-shadow-[0_0_40px_#fcd34d]*/}
            {/*       animate-pulse" />*/}
            {/*        </div>*/}
            {/*        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">*/}
            {/*            Средства самозащиты*/}
            {/*        </h1>*/}
            {/*        <p className="text-xl  text-yellow-400 max-w-2xl mx-auto">*/}
            {/*            Надёжные электрошокеры, перцовые баллончики и другое снаряжение для вашей безопасности*/}
            {/*        </p>*/}
            {/*        <p className="mt-4 text-sm text-red-700">18+</p>*/}
            {/*    </div>*/}
            {/*</header>*/}

             {/*Навигация + Поиск */}
            {/* Навигация + Поиск */}

            <div className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-950 pt-8 pb-5">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Верхняя строка: Логотип + Поиск + Корзина */}
                    <div className="flex items-center justify-between h-16">

                        {/* Логотип слева */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                            <Shield className="w-8 h-8 text-yellow-400" />
                            <div className="font-bold text-2xl tracking-tighter">
                                ELECTRO<span className="text-yellow-400">SHOCK</span>
                            </div>
                        </Link>

                        {/* Поиск по центру */}
                        <div className="flex-1 max-w-3xl mx-8">
                            <SearchBar
                                value={searchTerm}
                                onChange={setSearchTerm}
                                className="w-full"
                            />
                        </div>

                        {/* Корзина справа */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-3.5 rounded-2xl transition-all active:scale-95 group"
                        >
                            <ShoppingCart className="w-7 h-7 text-zinc-300 group-hover:text-yellow-400 transition-colors" />

                            <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 opacity-0
                                group-hover:opacity-100 transition-all duration-300 -z-10 blur-md" />

                            {isMounted && totalItems() > 0 && (
                                <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold
                                    w-6 h-6 rounded-full flex items-center justify-center
                                    shadow-lg ring-2 ring-red-500/30 border border-zinc-950">
                                    {totalItems()}
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Ссылки под поиском */}
                    {/*<div className="flex items-center justify-center gap-10 pb-4 text-sm font-medium">*/}
                    {/*    <Link*/}
                    {/*        href="/"*/}
                    {/*        className="relative hover:text-yellow-400 transition-colors pb-1*/}
                    {/*       after:absolute after:bottom-0 after:left-0 after:h-[2px]*/}
                    {/*       after:bg-yellow-400 after:w-0 hover:after:w-full*/}
                    {/*       after:transition-all after:duration-300"*/}
                    {/*    >*/}
                    {/*        Каталог*/}
                    {/*    </Link>*/}

                    {/*    <Link*/}
                    {/*        href="#delivery"*/}
                    {/*        className="relative hover:text-yellow-400 transition-colors pb-1*/}
                    {/*       after:absolute after:bottom-0 after:left-0 after:h-[2px]*/}
                    {/*       after:bg-yellow-400 after:w-0 hover:after:w-full*/}
                    {/*       after:transition-all after:duration-300"*/}
                    {/*    >*/}
                    {/*        Доставка*/}
                    {/*    </Link>*/}

                    {/*    <Link*/}
                    {/*        href="#guarantee"*/}
                    {/*        className="relative hover:text-yellow-400 transition-colors pb-1*/}
                    {/*       after:absolute after:bottom-0 after:left-0 after:h-[2px]*/}
                    {/*       after:bg-yellow-400 after:w-0 hover:after:w-full*/}
                    {/*       after:transition-all after:duration-300"*/}
                    {/*    >*/}
                    {/*        Гарантия*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/*<Navbar*/}
            {/*    searchTerm={searchTerm}*/}
            {/*    onSearchChange={setSearchTerm}*/}
            {/*/>*/}

            {/* Основной каталог */}
            <Catalog searchTerm={debouncedSearchTerm} />

            <footer className="bg-black py-12 text-center text-zinc-500 border-t border-zinc-900">
                <p>© 2026 ElectroShock Store • Все права защищены • 18+</p>
            </footer>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}