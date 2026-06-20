'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SelfDefenseArticle() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Хедер */}
            <div className="border-b border-zinc-800 bg-zinc-900">
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <Link href="/catalog" className="text-yellow-400 hover:text-yellow-300 mb-6 inline-flex items-center gap-2">
                        ← Назад в каталог
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Защита от нападения
                    </h1>
                    <p className="text-zinc-400 mt-4 text-lg">
                        Как правильно и эффективно использовать электрошокер
                    </p>
                </div>
            </div>

            {/* Основной контент */}
            <div className="max-w-3xl mx-auto px-6 pt-10">
                <div className="prose prose-invert prose-zinc max-w-none prose-p:text-[17.5px] leading-relaxed">

                    <p>
                        Электрошокер вызывает мгновенное судорожное сокращение мышц и временный сбой в работе нервной системы.
                        Нападающий испытывает сильную боль и дезориентацию, что даёт вам драгоценные секунды для отступления.
                    </p>

                    <p>
                        Чтобы удар был максимально эффективным, старайтесь целиться в крупные мышечные группы — бедро, плечо или область живота.
                        Эти зоны содержат большое количество нервных окончаний и позволяют быстро вывести противника из строя.
                    </p>

                    {/* Уменьшенная первая картинка */}
                    <div className="my-10">
                        <div className="relative aspect-[16/9] max-h-[320px] rounded-3xl overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/articles/self-defense-1.jpg"
                                alt="Применение электрошокера"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <p>
                        Благодаря локальному действию разряда, электрошокер можно использовать даже в ближнем контакте.
                        Современные модели пробивают одежду толщиной до 4 см.
                    </p>

                    <h2 className="text-2xl font-semibold mt-14 mb-6">Как влияет длительность разряда</h2>

                    <ul className="list-disc pl-6 space-y-5 text-zinc-200">
                        <li>
                            <strong>0,5–1 секунда</strong> — резкая боль и сильный испуг. Часто достаточно, чтобы отбить желание нападать.
                        </li>
                        <li>
                            <strong>1–3 секунды</strong> — вызывает судороги и потерю контроля над телом.
                        </li>
                        <li>
                            <strong>3–5 секунд</strong> — наиболее мощное воздействие, может привести к потере сознания или длительному шоку.
                        </li>
                    </ul>

                    {/* Уменьшенная вторая картинка */}
                    <div className="my-10">
                        <div className="relative aspect-[16/9] max-h-[320px] rounded-3xl overflow-hidden shadow-xl mx-auto">
                            <Image
                                src="/articles/self-defense-2.jpg"
                                alt="Длительное воздействие электрошокера"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <p>
                        Эффективность сильно зависит от физического состояния и болевого порога человека.
                        То, что одного выведет из строя за секунду, на другого может подействовать слабее.
                    </p>

                    {/* Блок с восклицательным знаком */}
                    <div className="mt-16 p-7 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400 font-medium flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <span>
                                Не рекомендуется применять электрошокер на людях пожилого возраста и производить разряды в область головы.
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}