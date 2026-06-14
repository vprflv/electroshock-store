'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HelpSelection() {
    const helpItems = [
        // {
        //     title: "Защита от нападения",
        //     image: "/help/self-defense.jpg",
        //     alt: "Самозащита",
        //     href: "/articles/self-defense",
        // },
        {
            title: "Как выбрать электрошокер?",
            image: "/help/choose-stun-gun.jpg",
            alt: "Выбор электрошокера",
            href: "/articles/how-to-choose-stun-gun",
        },
        {
            title: "Средства защиты от нападения собак",
            image: "/help/dog-defense.jpg",
            alt: "Защита от собак",
            href: "/articles/dog-defense",
        },
    ];

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
                Помощь в подборе
            </h3>

            <div className="space-y-6">
                {helpItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group block"
                    >
                        <div className="relative h-40 bg-zinc-800 rounded-2xl overflow-hidden mb-3">
                            <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 1024px) 280px, 320px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <p className="font-medium leading-tight text-white group-hover:text-yellow-400 transition-colors">
                            {item.title}
                        </p>
                        <p className="text-yellow-400 text-sm mt-1 inline-flex items-center gap-1 group-hover:underline">
                            Читать далее →
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}