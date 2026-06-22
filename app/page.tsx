'use client';

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
                showFiltersAndCart={false}
            />

            {/* ====================== ГЛАВНЫЙ БАННЕР (только на десктопе) ====================== */}
            <div className="hidden md:block">
                <HeroSlider />
            </div>


            {/* ====================== БЛОКИ ПОД БАННЕРОМ ====================== */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

                    {/* Электрошокеры */}
                    <Link
                        href="/catalog?category=электрошокеры"
                        className="group bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="relative h-[200px] md:h-[205px] lg:h-[210px] overflow-hidden">
                            <Image
                                src="/images/shock1.jpg"
                                alt="Электрошокеры"
                                fill
                                className="object-contain bg-zinc-950 group-hover:scale-105 transition-transform duration-500"
                            />

                        </div>
                    </Link>

                    {/* Фонари */}
                    <Link
                        href="/catalog?category=фонари"
                        className="group bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="relative h-[200px] md:h-[205px] lg:h-[210px] overflow-hidden">
                            <Image
                                src="/images/fonari.jpg"
                                alt="Фонари"
                                fill
                                className="object-contain bg-zinc-950 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />


                        </div>
                    </Link>

                    {/* Лазерные указки */}
                    <Link
                        href="/catalog?category=лазерные указки"
                        className="group bg-zinc-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="relative h-[200px] md:h-[205px] lg:h-[210px] overflow-hidden">
                            <Image
                                src="/images/laser.jpg"
                                alt="Лазерные указки"
                                fill
                                className="object-contain bg-zinc-950 group-hover:scale-105 transition-transform duration-500"
                            />


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