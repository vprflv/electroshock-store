'use client';

import { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';                    // ← добавили

import AddAdminModal from '@/features/admin/settings/components/AddAdminModal';
import { useAdminUsers } from '@/features/admin/settings/hooks/useAdminUsers';

export default function AdminSettingsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { users, isLoading, deleteUser } = useAdminUsers();

    const handleDelete = (id: string, name: string) => {
        toast.error(`Удалить администратора ${name}?`, {
            description: "Это действие нельзя отменить",
            action: {
                label: "Да, удалить",
                onClick: () => {
                    deleteUser(id);
                    toast.success(`Администратор ${name} удалён`);
                },
            },
            cancel: {
                label: "Отмена",
                onClick: () => console.log("отмена"),
            },
            duration: 6500,
        });
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold">Настройки</h1>
                    <p className="text-zinc-400 mt-1 md:mt-2 text-sm md:text-base">
                        Управление администраторами
                    </p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500
                               text-black font-semibold px-6 py-3.5 rounded-2xl transition w-full sm:w-auto"
                >
                    <UserPlus className="w-5 h-5" />
                    Добавить администратора
                </button>
            </div>

            {/* Таблица */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="px-6 md:px-8 py-5 text-left text-sm font-medium text-zinc-400">Имя</th>
                            <th className="px-6 md:px-8 py-5 text-left text-sm font-medium text-zinc-400">Email</th>
                            <th className="px-6 md:px-8 py-5 text-left text-sm font-medium text-zinc-400">Роль</th>
                            <th className="px-6 md:px-8 py-5 text-left text-sm font-medium text-zinc-400">Дата создания</th>
                            <th className="px-6 md:px-8 py-5 text-center text-sm font-medium text-zinc-400">Действия</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="py-16 text-center text-zinc-400">
                                    Загрузка администраторов...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-16 text-center text-zinc-500">
                                    Администраторов пока нет
                                </td>
                            </tr>
                        ) : (
                            users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-zinc-800/60 transition">
                                    <td className="px-6 md:px-8 py-5 font-medium text-white">
                                        {user.name}
                                    </td>
                                    <td className="px-6 md:px-8 py-5 text-zinc-400">
                                        {user.email}
                                    </td>
                                    <td className="px-6 md:px-8 py-5">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                                            ADMIN
                                        </span>
                                    </td>
                                    <td className="px-6 md:px-8 py-5 text-zinc-400 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                    </td>
                                    <td className="px-6 md:px-8 py-5 text-center">
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            className="p-3 hover:bg-zinc-800 rounded-xl text-red-400 hover:text-red-500 transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddAdminModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}