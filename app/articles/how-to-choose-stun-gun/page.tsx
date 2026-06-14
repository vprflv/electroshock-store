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

                    <h2 className="text-2xl font-semibold mt-12 mb-6">1. Для защиты от нападения</h2>
                    <p>
                        Лучше всего подойдут компактные модели. Их удобно носить каждый день, и в критической ситуации ими проще воспользоваться скрытно.
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-6">2. Электрошокеры-дубинки</h2>
                    <p>
                        Самые мощные по разряду. Отлично подходят для автомобилистов, охранников и тех, кому нужна максимальная эффективность.
                    </p>

                    {/* Второе уменьшенное фото */}
                    <div className="my-10">
                        <div className="relative aspect-[16/9] max-h-[320px] rounded-3xl overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/articles/stun-gun-baton.jpg"
                                alt="Электрошокер-дубинка"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

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

                    <p className="mt-12">
                        В нашем каталоге каждая модель снабжена понятными пиктограммами — они помогают быстро понять, для каких задач лучше всего подходит тот или иной электрошокер.
                    </p>

                </div>
            </div>
        </div>
    );
}