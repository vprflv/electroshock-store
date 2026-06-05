'use client';

import { useState } from 'react';
import { Shield, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { useCart } from "@/store/useCart";
import CartModal from "@/features/cart/CartModal";
import SearchBar from "@/features/search/SearchBar";
import Catalog from "@/features/catalog/Catalog";
import {useDebounce} from "@/hooks/useDebounce";
import {useMounted} from "@/hooks/useMounted";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 350);
    const { totalItems } = useCart();
    const isMounted = useMounted();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* HERO */}
            <header className="bg-gradient-to-br from-zinc-900 via-black to-zinc-950 py-24 border-b border-zinc-800">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex justify-center mb-6">
                        <Shield className="w-24 h-24 text-yellow-400" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Средства самозащиты
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Надёжные электрошокеры, перцовые баллончики и другое снаряжение для вашей безопасности
                    </p>
                    <p className="mt-4 text-sm text-zinc-500">18+</p>
                </div>
            </header>

            {/* Навигация + Поиск */}
            <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8 text-sm font-medium">
                            <Link href="/" className="hover:text-yellow-400 transition-colors">Каталог</Link>
                            <Link href="#delivery" className="hover:text-yellow-400 transition-colors">Доставка</Link>
                            <Link href="#guarantee" className="hover:text-yellow-400 transition-colors">Гарантия</Link>
                            <Link href="#about" className="hover:text-yellow-400 transition-colors">О магазине</Link>
                        </div>

                        <SearchBar value={searchTerm} onChange={setSearchTerm} />

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-yellow-400 px-6 py-2.5 rounded-2xl transition-all group"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                            {isMounted && totalItems() > 0 && (
                                <div className="ml-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems()}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Основной каталог */}
            <Catalog searchTerm={debouncedSearchTerm} />

            <footer className="bg-black py-12 text-center text-zinc-500 border-t border-zinc-900">
                <p>© 2026 ElectroShock Store • Все права защищены • 18+</p>
            </footer>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}