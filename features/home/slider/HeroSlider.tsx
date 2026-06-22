'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        image: '/slider/taser1.jpg',
        badge: 'Новинка!',
        title: 'Стреляющий электрошокер',
        highlight: 'TASER',
        price: '5 500 ₽',
        link: '/product/41',
    },
    {
        id: 2,
        image: '/slider/309-21.jpg',
        badge: 'Максимальный эффект!',
        title: 'Электрошокер',
        highlight: 'TW-309 Гепард',
        price: '1900 ₽',
        link: '/product/43',
    },
    {
        id: 3,
        image: '/slider/slide_916.jpg',
        badge: 'Хит продаж',
        title: 'Электрошокер',
        highlight: 'ОСА-916 MAXI',
        price: '2 100 ₽',
        link: '/product/42',
    },
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const current = slides[currentIndex];

    return (
        <section className="relative py-6 md:py-8 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="relative h-[450px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl">

                    {/* Изображение на фоне */}
                    <Image
                        src={current.image}
                        alt={current.highlight}
                        fill
                        className="object-cover object-center"
                        priority
                    />

                    {/* Лёгкое затемнение (можно убрать совсем, если захочешь) */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Контент по центру */}
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                        <div className="text-center space-y-5 max-w-lg">
                            <div className="inline-block bg-yellow-400 text-black text-xs font-semibold px-5 py-1.5 rounded-full">
                                {current.badge}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                                {current.title}<br />
                                <span className="text-yellow-400">{current.highlight}</span>
                            </h1>

                            <p className="text-3xl font-semibold text-white">{current.price}</p>

                            <Link
                                href={current.link}
                                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all"
                            >
                                Подробности
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Индикаторы */}
            <div className="flex justify-center gap-3 mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? 'bg-yellow-400 scale-125'
                                : 'bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}