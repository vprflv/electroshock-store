'use client';

import { useSession } from 'next-auth/react';

export default function AdminHeader() {
    const { data: session } = useSession();

    const userName = session?.user?.name || 'Администратор';
    const userEmail = session?.user?.email || 'admin@electroshock.ru';

    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between">
            <div className="font-medium">Администрирование</div>

            <div className="text-right">
                <div className="font-medium">{userName}</div>
                <div className="text-sm text-zinc-400">{userEmail}</div>
            </div>
        </header>
    );
}