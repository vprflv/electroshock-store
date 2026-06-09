'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';


import HeaderMobile from "@/components/header/HeaderMobile";
import HeaderDesktop from "@/components/header/ HeaderDesktop";

interface NavbarProps {

    onCartClick: () => void;
    isMounted: boolean;
}

export default function Navbar({
                                   onCartClick,
                                   isMounted
                               }: NavbarProps) {
    const { totalItems } = useCart();

    return (
        <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <HeaderDesktop
                    onCartClick={onCartClick}
                    totalItems={totalItems()}
                    isMounted={isMounted}
                />

                <HeaderMobile
                    onCartClick={onCartClick}
                    totalItems={totalItems()}
                    isMounted={isMounted}
                />
            </div>
        </header>
    );
}