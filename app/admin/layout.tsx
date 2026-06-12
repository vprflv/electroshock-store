'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Дашборд', icon: Home },
        { href: '/admin/products', label: 'Товары', icon: Package },
        { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
        { href: '/admin/settings', label: 'Настройки', icon: Settings },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
                            <span className="text-black font-bold text-xl">⚡</span>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">ElectroShock</div>
                            <div className="text-xs text-zinc-500">Админ-панель</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                isActive(href)
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800 mt-auto">
                    <button
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-zinc-800 transition text-red-400 hover:text-red-500"
                        onClick={() => {
                            // TODO: добавить logout логику позже
                            console.log('Logout clicked');
                        }}
                    >
                        <LogOut className="w-5 h-5" />
                        Выйти
                    </button>
                </div>
            </div>

            {/* Основной контент */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between">
                    <div className="font-medium">Администрирование</div>
                    <div className="text-sm text-zinc-400">admin@electroshock.ru</div>
                </header>

                <main className="flex-1 overflow-auto bg-zinc-950">
                    {children}
                </main>
            </div>
        </div>
    );
}