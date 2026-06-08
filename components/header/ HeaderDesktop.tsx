'use client';

import Link from "next/link";
import { Shield, ShoppingCart } from 'lucide-react';
import SearchBar from "@/features/search/SearchBar";

interface HeaderDesktopProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onCartClick: () => void;
    totalItems: number;
    isMounted: boolean;
}

export default function HeaderDesktop({
                                          searchTerm,
                                          onSearchChange,
                                          onCartClick,
                                          totalItems,
                                          isMounted,
                                      }: HeaderDesktopProps) {
    return (
        <div className="hidden lg:flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <Shield className="w-9 h-9 text-yellow-400" />
                <div className="font-bold text-3xl tracking-tighter">
                    ELECTRO<span className="text-yellow-400">SHOCK</span>
                </div>
            </Link>

            <div className="flex-1 max-w-3xl mx-8">
                <SearchBar value={searchTerm} onChange={onSearchChange} className="w-full" />
            </div>

            <button
                onClick={onCartClick}
                className="relative p-4 rounded-2xl hover:bg-zinc-900 transition-all active:scale-95 group"
            >
                <ShoppingCart className="w-7 h-7 text-zinc-300 group-hover:text-yellow-400 transition-colors" />

                {isMounted && totalItems > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold
                        w-6 h-6 rounded-full flex items-center justify-center
                        shadow-lg ring-2 ring-zinc-950 border border-zinc-900">
                        {totalItems}
                    </div>
                )}
            </button>
        </div>
    );
}