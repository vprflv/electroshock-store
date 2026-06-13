'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, Settings, X } from 'lucide-react';
import LogoutButton from "@/features/admin/logout/components/LogoutButton";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Дашборд', icon: Home },
        { href: '/admin/products', label: 'Товары', icon: Package },
        { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
        { href: '/admin/settings', label: 'Настройки', icon: Settings },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <div className={`
            fixed md:static inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            flex flex-col
        `}>

            {/* Логотип + кнопка закрытия */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between md:justify-start">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <span className="text-black font-bold text-xl">⚡</span>
                    </div>
                    <div className={"cursor-pointer"}>
                        <div className="font-semibold text-lg">ElectroShock</div>
                        <div className="text-xs text-zinc-500">Админ-панель</div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="md:hidden text-zinc-400 hover:text-white"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Навигация */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition text-base ${
                            isActive(href)
                                ? 'bg-zinc-800 text-white font-medium'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        }`}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Выход */}
            <div className="p-4 border-t border-zinc-800 mt-auto">
                <LogoutButton />
            </div>
        </div>
    );
}