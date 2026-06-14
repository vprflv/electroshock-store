'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Хедер */}
            <div className="border-b border-zinc-800 bg-zinc-900">
                <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        ОСА — защита, которой можно доверять
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Мы помогаем людям чувствовать себя увереннее в любых ситуациях
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="prose prose-invert prose-zinc max-w-none text-[17.5px] leading-relaxed">

                    <p>
                        Мы — специализированный магазин средств самообороны.
                        Наша миссия — предоставлять людям надёжные и современные инструменты для защиты себя и своих близких.
                    </p>

                    <h2 className="text-3xl font-semibold mt-16 mb-8">Почему выбирают нас</h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                            <div className="text-yellow-400 text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-3">Только проверенные средства</h3>
                            <p className="text-zinc-400">
                                Мы работаем только с сертифицированными производителями.
                                Каждый товар проходит проверку перед поступлением в продажу.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                            <div className="text-yellow-400 text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-3">Широкий ассортимент</h3>
                            <p className="text-zinc-400">
                                От компактных электрошокеров для женщин до мощных дубинок и фонарей.
                                У нас есть решение для каждой задачи.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                            <div className="text-yellow-400 text-4xl mb-4">🛡️</div>
                            <h3 className="text-xl font-semibold mb-3">Честные рекомендации</h3>
                            <p className="text-zinc-400">
                                Мы не продаём «всё подряд». Наша задача — подобрать именно то средство,
                                которое будет максимально эффективным именно для вас.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold mt-20 mb-8">Наша философия</h2>
                    <p className="text-lg">
                        Мы уверены, что каждый человек имеет право на безопасность.
                        Современный мир непредсказуем, и лучше быть готовым к любой ситуации, чем потом жалеть.
                    </p>
                    <p className="text-lg mt-6">
                        Мы не просто продаём электрошокеры и средства самообороны.
                        Мы помогаем людям чувствовать себя увереннее каждый день.
                    </p>

                    {/* Блок с призывом */}
                    <div className="mt-20 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-400/20 rounded-3xl p-10 text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Готовы выбрать свою защиту?
                        </h3>
                        <Link
                            href="/"
                            className="inline-block bg-yellow-400 text-black font-semibold px-10 py-4 rounded-2xl hover:bg-yellow-300 transition mt-4"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}