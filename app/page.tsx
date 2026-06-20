'use client'; // ← Делаем страницу клиентской, т.к. Navbar требует состояния

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Logo from "@/components/ui/Logo";
import Navbar from "@/components/Navbar";
import CartModal from "@/features/cart/CartModal";
import HeroSlider from "@/features/home/slider/HeroSlider";

export default function Home() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Для предотвращения hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCartOpen = () => setIsCartOpen(true);
    const handleCartClose = () => setIsCartOpen(false);
    const handleFiltersClick = () => {
        setIsFiltersOpen(!isFiltersOpen);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* ====================== НАВИГАЦИЯ ====================== */}
            <Navbar
                onCartClick={handleCartOpen}
                onFiltersClick={handleFiltersClick}
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
                isMounted={isMounted}
            />

            {/* ====================== ГЛАВНЫЙ БАННЕР ====================== */}
            <HeroSlider />
            {/* ====================== БЛОКИ ПОД БАННЕРОМ ====================== */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <Link
                        href="/catalog/electroshockers"
                        className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative h-80 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/images/electroshockers.jpg"
                                alt="Электрошокеры"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-3xl font-bold">
                                Электрошокеры<br />на все случаи жизни
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/catalog/flashlights"
                        className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative h-80 bg-zinc-950 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/images/headlamp.jpg"
                                alt="Фонари"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="text-3xl font-bold mb-2">Фонари налобные, ручные</div>
                                <div className="text-yellow-400 text-sm">МОЩНЫЕ • ДАЛЬНОБОЙНЫЕ</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/catalog/laser-pointers"
                        className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative h-80 bg-green-950 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/images/laser.jpg"
                                alt="Лазерные указки"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-3xl font-bold text-green-400">
                                Лазерные<br />указки
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <CartModal
                isOpen={isCartOpen}
                onClose={handleCartClose}
            />
        </div>
    );
}