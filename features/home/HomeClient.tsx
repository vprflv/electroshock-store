'use client';

import { useState } from 'react';
import { useCart } from "@/store/useCart";
import { useDebounce } from "@/hooks/useDebounce";
import { useMounted } from "@/hooks/useMounted";

import Navbar from "@/components/Navbar";
import Catalog from "@/features/catalog/Catalog";
import CartModal from "@/features/cart/CartModal";

export default function HomeClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 350);
    const { totalItems } = useCart();
    const isMounted = useMounted();

    const handleCartOpen = () => setIsCartOpen(true);
    const handleCartClose = () => setIsCartOpen(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            <Navbar
                onCartClick={handleCartOpen}
                isMounted={isMounted}
            />

            <Catalog
                searchTerm={debouncedSearchTerm}
                onSearchChange={setSearchTerm}
            />

            <footer className="bg-black py-10 text-center text-zinc-500 border-t border-zinc-900 mt-12">
                <p>© 2026 ElectroShock Store • Все права защищены • 18+</p>
            </footer>

            <CartModal
                isOpen={isCartOpen}
                onClose={handleCartClose}
            />
        </div>
    );
}