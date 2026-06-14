'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HowToChooseStunGun() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="border-b border-zinc-800 bg-zinc-900">
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <Link href="/" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-flex items-center gap-2">
                        ← Назад в каталог
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Как выбрать электрошокер?
                    </h1>
                    <p className="text-zinc-400 mt-4 text-lg">
                        Полное руководство: от задач до конкретных моделей
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-10">
                <div className="prose prose-invert prose-zinc max-w-none prose-p:text-[17.5px] leading-relaxed">

                    <p>
                        Прежде чем покупать электрошокер, важно честно ответить на вопрос — <strong>для чего он вам нужен</strong>.
                        Именно от этого зависит, какая модель будет действительно полезной.
                    </p>

                    {/* Уменьшенные фото */}
                    <div className="my-10">
                        <div className="relative aspect-[16/9] max-h-[320px] rounded-3xl overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/articles/gepard-2.jpg"
                                alt="Разные типы электрошокеров"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-12 mb-6">1. Для защиты от нападения собак</h2>
                    <p>
                        Лучше всего для повседневного ношения подойдут компактные модели.
                        Они лёгкие, удобные и занимают минимум места в сумке или кармане.
                    </p>


                    <h2 className="text-2xl font-semibold mt-12 mb-6">3. Защита от собак</h2>
                    <p>
                        Здесь важны мощный треск и широкая дуга разряда. Компактные модели часто не дают нужной дистанции.
                    </p>

                    {/* Третье фото */}
                    <div className="my-10">
                        <div className="relative aspect-[16/9] max-h-[320px] rounded-3xl overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/articles/928.jpg"
                                alt="Электрошокер "
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}