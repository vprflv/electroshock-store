'use client';

import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminUsers } from '../hooks/useAdminUsers';

type AddAdminModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddAdminModal({ isOpen, onClose }: AddAdminModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { createAdmin } = useAdminUsers();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createAdmin(formData);
            toast.success('Администратор успешно создан!');
            onClose();
            setFormData({ name: '', email: '', password: '' });
        } catch (error: any) {
            toast.error(error.message || 'Не удалось создать администратора');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-700 px-6 py-5">
                    <h2 className="text-xl font-semibold text-white">
                        Новый администратор
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white p-2 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2 font-medium">
                            Имя
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4
                                       text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none text-base"
                            placeholder="Иван Иванов"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4
                                       text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none text-base"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2 font-medium">
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4
                                           text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none text-base pr-12"
                                placeholder="Минимум 6 символов"
                                minLength={6}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700
                                   text-black font-semibold py-4 rounded-2xl transition text-base active:scale-[0.985]"
                    >
                        {isLoading ? 'Создаём...' : 'Создать администратора'}
                    </button>
                </form>
            </div>
        </div>
    );
}