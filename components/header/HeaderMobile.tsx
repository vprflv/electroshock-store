'use client';

import Link from "next/link";
import { ShoppingCart } from 'lucide-react';

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
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between h-16 px-4">

                {/* Логотип с осой */}
                <Link href="/" className="flex mt-5 items-center gap-2.5 relative flex-shrink-0">
                    <img
                        src="/logo.png"
                        alt="ElectroShock"
                        className="h-15 w-auto object-contain drop-shadow-[0_0_2px_#facc15]
                                   absolute -top-5 -left-1 z-10 transition-all"
                    />
                    <div className="flex ml-8 flex-col pt-3">
                        <div className="text-2xl font-black tracking-tighter text-yellow-400 leading-none">
                            ОСА
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium tracking-widest -mt-0.5">
                            ОРУЖИЕ ДЛЯ САМООБОРОНЫ
                        </div>
                    </div>
                </Link>

                {/* Корзина */}
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
                               shadow-lg ring-2 ring-zinc-950 border border-zinc-900"
                        >
                            {totalItems}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}