// app/admin/page.tsx
import Link from 'next/link';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">Добро пожаловать в админку</h1>
                <p className="text-zinc-400 mt-2">Управление магазином ElectroShock Store</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400">Товаров всего</p>
                            <p className="text-4xl font-bold mt-2">248</p>
                        </div>
                        <Package className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400">В наличии</p>
                            <p className="text-4xl font-bold mt-2 text-green-400">187</p>
                        </div>
                        <TrendingUp className="w-10 h-10 text-green-400" />
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400">Заказов сегодня</p>
                            <p className="text-4xl font-bold mt-2">12</p>
                        </div>
                        <DollarSign className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-400">Активных брендов</p>
                            <p className="text-4xl font-bold mt-2">18</p>
                        </div>
                        <Users className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>
            </div>

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
        </div>
    );
}