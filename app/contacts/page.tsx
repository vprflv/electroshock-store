'use client';

import Link from 'next/link';

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-16">
                <Link href="/" className="text-yellow-400 hover:text-yellow-300 mb-8 inline-flex items-center gap-2 text-sm">
                    ← На главную
                </Link>

                <h1 className="text-4xl sm:text-5xl font-bold mb-10">Контакты</h1>

                <div className="grid md:grid-cols-2 gap-10 md:gap-16">

                    {/* Левая колонка - Контакты */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Связаться с нами</h2>

                            {/* Блок консультации */}
                            <div className="bg-zinc-900 border border-yellow-400/30 rounded-3xl p-7 md:p-9">
                                <p className="text-yellow-400 text-sm uppercase tracking-widest mb-2">Консультация и помощь в выборе</p>
                                <p className="text-3xl md:text-4xl font-semibold text-white hover:text-yellow-400 transition">
                                    8 (913) 519-79-27
                                </p>
                                <p className="text-zinc-400 mt-4">
                                    Звонки принимаем ежедневно с 9:00 до 21:00
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Адрес магазина</h3>
                            <p className="text-lg text-zinc-300">
                                г. Красноярск,<br />
                                ул. Лесопильщиков, 163<br />
                                (в помещении магазина «Автомасла»)
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Режим работы</h3>
                            <p className="text-zinc-300">
                                Пн — Вс: с 10:00 до 20:00
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Email</h3>
                            <p className="text-yellow-400 hover:text-yellow-300 transition">
                                info@osa.store
                            </p>
                        </div>
                    </div>

                    {/* Правая колонка - Дополнительно */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Как с нами связаться</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-xl">📞</div>
                                    <div>
                                        <p className="font-medium">Телефон</p>
                                        <p className="text-yellow-400">8 (913) 519-79-27</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-xl">✉️</div>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-yellow-400">info@osa.store</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-xl">📍</div>
                                    <div>
                                        <p className="font-medium">Адрес</p>
                                        <p className="text-zinc-400">Красноярск, ул. Лесопильщиков, 163</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}