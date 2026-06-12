'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface AdminHeaderProps {
    children?: ReactNode;
}

export default function AdminHeader({ children }: AdminHeaderProps) {
    const { data: session } = useSession();

    const userName = session?.user?.name || 'Администратор';
    const userEmail = session?.user?.email || 'admin@electroshock.ru';

    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-900 px-4 md:px-8 flex items-center justify-between">
            {/* Левая часть: кнопка меню + заголовок */}
            <div className="flex items-center gap-4">
                {children} {/* ← сюда приходит кнопка гамбургера на мобильных */}

                <div className="font-medium text-lg md:text-xl hidden sm:block">
                    Администрирование
                </div>
            </div>

            {/* Правая часть: информация о пользователе */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <div className="font-medium text-sm md:text-base">{userName}</div>
                    <div className="text-xs text-zinc-400">{userEmail}</div>
                </div>


            </div>
        </header>
    );
}