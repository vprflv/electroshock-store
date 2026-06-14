'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export default function LogoutButton() {
    const handleLogout = () => {
        toast.error('Выйти из админки?', {
            description: 'Вы действительно хотите завершить сессию?',
            action: {
                label: 'Да, выйти',
                onClick: async () => {
                    try {
                        toast.loading('Выход из системы...', { id: 'logout' });

                        await signOut({
                            callbackUrl: '/admin',
                            redirect: true,
                        });

                    } catch (error) {
                        console.error('Logout error:', error);
                        toast.error('Не удалось выйти из системы', { id: 'logout' });
                    }
                },
            },
            cancel: {
                label: "Отмена",
                onClick: () => console.log("отмена"),
            },
            duration: 6000,
        });
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-zinc-800 transition text-red-400 hover:text-red-500"
        >
            <LogOut className="w-5 h-5" />
            Выйти
        </button>
    );
}