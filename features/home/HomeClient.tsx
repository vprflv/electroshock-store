'use client';

import { useState } from 'react';
import { useCart } from "@/store/useCart";
import CartModal from "@/features/cart/CartModal";
import Catalog from "@/features/catalog/Catalog";
import { useDebounce } from "@/hooks/useDebounce";
import { useMounted } from "@/hooks/useMounted";
import HeaderDesktop from "@/components/header/ HeaderDesktop";
import HeaderMobile from "@/components/header/HeaderMobile";



export default function HomeClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 350);
    const { totalItems } = useCart();           // лучше использовать селектор!
    const isMounted = useMounted();

    const handleCartOpen = () => setIsCartOpen(true);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* ==================== HEADER ==================== */}
            <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <HeaderDesktop
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onCartClick={handleCartOpen}
                        totalItems={totalItems()}
                        isMounted={isMounted}
                    />

                    <HeaderMobile
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onCartClick={handleCartOpen}
                        totalItems={totalItems()}
                        isMounted={isMounted}
                    />
                </div>
            </header>

            {/* ==================== КАТАЛОГ ==================== */}
            <Catalog searchTerm={debouncedSearchTerm} />

            {/* ==================== FOOTER ==================== */}
            <footer className="bg-black py-10 text-center text-zinc-500 border-t border-zinc-900 mt-12">
                <p>© 2026 ElectroShock Store • Все права защищены • 18+</p>
            </footer>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}