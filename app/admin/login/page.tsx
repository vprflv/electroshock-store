'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Приводим email к нижнему регистру
        const normalizedEmail = email.toLowerCase().trim();

        const result = await signIn('credentials', {
            email: normalizedEmail,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Неверный email или пароль');
            console.error('SignIn error:', result.error); // для отладки
        } else {
            // Основной редирект
            router.push('/admin');
            router.refresh();

            // ←←← Самое важное для решения "работает только со 2 раза"
            setTimeout(() => {
                window.location.href = '/admin';
            }, 400);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                        ⚡
                    </div>
                    <h1 className="text-3xl font-bold">Вход в админку</h1>
                    <p className="text-zinc-400 mt-2">ElectroShock Store</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-2 text-zinc-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none"
                            placeholder="admin@electroshock.ru"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-zinc-400">Пароль</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none pr-12"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 text-black font-semibold py-4 rounded-2xl transition"
                    >
                        {loading ? 'Входим...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}