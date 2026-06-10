'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Неверный email или пароль');
        } else {
            router.push('/admin');
            router.refresh();
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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none"
                            placeholder="••••••••"
                            required
                        />
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

                <p className="text-center text-xs text-zinc-500 mt-8">
                    Тестовый аккаунт: <br />
                    <strong>admin@electroshock.ru</strong> / <strong>admin123</strong>
                </p>
            </div>
        </div>
    );
}