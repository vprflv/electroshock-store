'use client';

import { useState } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import AddAdminModal from '@/features/admin/settings/components/AddAdminModal';
import { useAdminUsers } from '@/features/admin/settings/hooks/useAdminUsers';

export default function AdminSettingsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { users, isLoading, deleteUser } = useAdminUsers();

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Удалить пользователя ${name}?`)) {
            deleteUser(id);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold">Настройки</h1>
                    <p className="text-zinc-400 mt-2">Управление администраторами</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-2xl transition"
                >
                    <UserPlus className="w-5 h-5" />
                    Добавить администратора
                </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-zinc-800">
                        <th className="px-8 py-5 text-left">Имя</th>
                        <th className="px-8 py-5 text-left">Email</th>
                        <th className="px-8 py-5 text-left">Роль</th>
                        <th className="px-8 py-5 text-left">Дата создания</th>
                        <th className="px-8 py-5 text-center">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                    {isLoading ? (
                        <tr><td colSpan={5} className="py-12 text-center">Загрузка...</td></tr>
                    ) : users.length === 0 ? (
                        <tr><td colSpan={5} className="py-12 text-center text-zinc-500">Администраторов пока нет</td></tr>
                    ) : (
                        users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-zinc-800/50 transition">
                                <td className="px-8 py-5 font-medium">{user.name}</td>
                                <td className="px-8 py-5 text-zinc-400">{user.email}</td>
                                <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                                            ADMIN
                                        </span>
                                </td>
                                <td className="px-8 py-5 text-zinc-400">
                                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <button
                                        onClick={() => handleDelete(user.id, user.name)}
                                        className="text-red-400 hover:text-red-500 transition p-2"
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

            <AddAdminModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}