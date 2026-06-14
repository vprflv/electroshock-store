'use client';

import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Хедер с навигацией */}
            <div className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-5 sm:px-6 py-4">
                    <Link
                        href="/"
                        className="text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        ← На главную
                    </Link>
                </div>
            </div>

            {/* Основной контент */}
            <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 pb-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                        О-СА — защита, которой можно доверять
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 mt-6 max-w-2xl mx-auto">
                        Мы помогаем людям чувствовать себя увереннее в любых ситуациях
                    </p>
                </div>

                <div className="prose prose-invert prose-zinc max-w-none text-[17px] md:text-[17.5px] leading-relaxed">

                    <p>
                        Мы — специализированный магазин средств самообороны.
                        Наша миссия — предоставлять людям надёжные, современные и проверенные инструменты для защиты себя и своих близких.
                    </p>

                    <h2 className="text-3xl font-semibold mt-16 mb-10 text-center md:text-left">
                        Почему выбирают нас
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="bg-zinc-900 p-7 md:p-8 rounded-3xl border border-zinc-800 hover:border-yellow-400/30 transition-all">
                            <div className="text-yellow-400 text-4xl mb-5">🔒</div>
                            <h3 className="text-xl font-semibold mb-3">Только проверенные средства</h3>
                            <p className="text-zinc-400">
                                Работаем исключительно с сертифицированными производителями.
                                Каждый товар проходит тщательную проверку перед поступлением в продажу.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-7 md:p-8 rounded-3xl border border-zinc-800 hover:border-yellow-400/30 transition-all">
                            <div className="text-yellow-400 text-4xl mb-5">⚡</div>
                            <h3 className="text-xl font-semibold mb-3">Широкий ассортимент</h3>
                            <p className="text-zinc-400">
                                От компактных электрошокеров для женщин до мощных дубинок и тактических фонарей.
                                Решение есть для каждой задачи.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-7 md:p-8 rounded-3xl border border-zinc-800 hover:border-yellow-400/30 transition-all">
                            <div className="text-yellow-400 text-4xl mb-5">🛡️</div>
                            <h3 className="text-xl font-semibold mb-3">Честные рекомендации</h3>
                            <p className="text-zinc-400">
                                Мы не продаём «всё подряд». Наша задача — подобрать именно то средство,
                                которое будет максимально эффективным именно для вас.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold mt-20 mb-8 text-center md:text-left">
                        Наша философия
                    </h2>
                    <p className="text-lg">
                        Мы уверены, что каждый человек имеет право на безопасность.
                        Современный мир непредсказуем, и лучше быть готовым к любой ситуации, чем потом жалеть.
                    </p>
                    <p className="text-lg mt-6">
                        Мы не просто продаём электрошокеры и средства самообороны.
                        Мы помогаем людям чувствовать себя увереннее каждый день.
                    </p>

                    {/* Блок с призывом */}
                    <div className="mt-20 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-400/20 rounded-3xl p-10 md:p-14 text-center">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-5">
                            Готовы выбрать свою защиту?
                        </h3>
                        <Link
                            href="/"
                            className="inline-block bg-yellow-400 text-black font-semibold px-10 py-4 rounded-2xl hover:bg-yellow-300 transition text-lg mt-4"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}