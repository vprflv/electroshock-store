'use client';

import Link from "next/link";
import { Shield, ShoppingCart } from 'lucide-react';
import SearchBar from "@/features/search/SearchBar";

interface HeaderMobileProps {
    onCartClick: () => void;
    totalItems: number;
    isMounted: boolean;
}

export default function HeaderMobile({
                                         onCartClick,
                                         totalItems,
                                         isMounted,
                                     }: HeaderMobileProps) {
    return (
        <div className="lg:hidden">
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2.5">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    <div className="font-bold text-2xl tracking-tighter">
                        ELECTRO<span className="text-yellow-400">SHOCK</span>
                    </div>
                </Link>

                <button
                    onClick={onCartClick}
                    className="relative p-3 active:scale-95 transition-transform"
                >
                    <ShoppingCart className="w-7 h-7 text-zinc-300" />

                    {isMounted && totalItems > 0 && (
                        <div
                            suppressHydrationWarning
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold
                               w-5 h-5 rounded-full flex items-center justify-center
                               shadow-lg ring-2 ring-zinc-950 border border-zinc-900
                               transition-all duration-150 scale-100"
                        >
                            {totalItems}
                        </div>
                    )}
                </button>
            </div>

        </div>
    );
}