'use client';

import Link from 'next/link';
import { Package, TrendingUp, Users, DollarSign, Loader2 } from 'lucide-react';
import { useAdminStats } from '@/features/admin/hooks/useAdminStats';

export default function AdminDashboard() {
    const { data: stats, isLoading, error } = useAdminStats();

    const statCards = [
        {
            title: 'Товаров всего',
            value: stats?.totalProducts ?? 0,
            icon: Package,
            color: 'text-yellow-400',
        },
        {
            title: 'В наличии',
            value: stats?.inStockProducts ?? 0,
            icon: TrendingUp,
            color: 'text-green-400',
        },
        {
            title: 'Заказов сегодня',
            value: stats?.ordersToday ?? 0,
            icon: DollarSign,
            color: 'text-yellow-400',
        },
        {
            title: 'Активных брендов',
            value: stats?.activeBrands ?? 0,
            icon: Users,
            color: 'text-yellow-400',
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">Добро пожаловать в админку</h1>
                <p className="text-zinc-400 mt-2">Управление магазином ElectroShock Store</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-400">{stat.title}</p>
                                    {isLoading ? (
                                        <div className="mt-3 flex items-center gap-2">
                                            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                                        </div>
                                    ) : (
                                        <p className="text-4xl font-bold mt-2">
                                            {stat.value.toLocaleString('ru-RU')}
                                        </p>
                                    )}
                                </div>
                                <Icon className={`w-10 h-10 ${stat.color}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Быстрые действия */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/admin/products"
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-2xl p-8 transition group"
                >
                    <Package className="w-10 h-10 text-yellow-400 mb-4" />
                    <h3 className="text-xl font-semibold">Управление товарами</h3>
                    <p className="text-zinc-400 mt-2">Добавление, редактирование, удаление товаров</p>
                </Link>

                <Link
                    href="/admin/products/new"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl p-8 transition"
                >
                    <Package className="w-10 h-10 mb-4" />
                    <h3 className="text-xl font-semibold">Добавить новый товар</h3>
                    <p className="mt-2">Быстрое создание одного товара</p>
                </Link>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                    Не удалось загрузить статистику. Попробуйте обновить страницу.
                </div>
            )}
        </div>
    );
}