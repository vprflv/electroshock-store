'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
export default function LogoutButton() {
    const handleLogout = async () => {
        const confirmed = confirm('Вы действительно хотите выйти из админки?');
        if (!confirmed) return;

        try {
            toast.loading('Выход...', { id: 'logout' });
            await signOut({
                callbackUrl: '/admin',     // куда перенаправить после выхода
                redirect: true,
            });

            toast.success('Вы успешно вышли из системы', { id: 'logout' });
        } catch (error) {
            console.error('Logout error:', error);

            toast.error('Не удалось выйти', { id: 'logout' });
        }
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