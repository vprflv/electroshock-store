'use client';

import Link from 'next/link';

export default function DeliveryPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-14">
                <Link href="/" className="text-yellow-400 hover:text-yellow-300 mb-8 inline-flex items-center gap-2 text-sm">
                    ← На главную
                </Link>

                <h1 className="text-3xl sm:text-4xl font-bold mb-10">Доставка и оплата</h1>

                <div className="space-y-12 text-[16px] md:text-[17px] leading-relaxed text-zinc-300">

                    {/* Доставка по Красноярску */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Доставка по Красноярску</h2>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 md:p-8">
                            <p className="text-emerald-400 font-semibold text-lg">
                                Бесплатная курьерская доставка
                            </p>
                            <p className="mt-3">
                                При любом заказе доставка по Красноярску — <span className="text-white">бесплатно</span>.
                            </p>
                        </div>
                    </div>

                    {/* Самовывоз */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Самовывоз</h2>
                        <div className="bg-zinc-900 rounded-3xl p-6 md:p-8">
                            <p className="text-white">г. Красноярск, ул. Лесопильщиков, 163</p>
                            <p className="text-zinc-400 mt-1">(магазин «Автомасла»)</p>
                            <p className="text-zinc-400 mt-4">Ежедневно с 10:00 до 20:00</p>
                        </div>
                    </div>

                    {/* Доставка по России */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Доставка по России</h2>
                        <div className="bg-zinc-900 rounded-3xl p-6 md:p-8">
                            <p className="font-medium text-white mb-4">Транспортные компании:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-[15px] md:text-[16px]">
                                <div>• СДЭК</div>
                                <div>• Энергия</div>
                                <div>• КИТ</div>
                                <div>• ПЭК</div>
                                <div>• Boxberry</div>
                                <div>• Деловые Линии</div>
                            </div>

                            <p className="mt-8 text-zinc-400 text-[15px]">
                                Стоимость доставки зависит от тарифов выбранной транспортной компании
                                и рассчитывается при оформлении заказа.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}