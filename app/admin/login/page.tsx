'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail } from 'lucide-react';

export default function AdminLogin() {
    const [step, setStep] = useState<'credentials' | 'code'>('credentials');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Шаг 1: Логин + пароль
    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            email: email.toLowerCase().trim(),
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Неверный email или пароль');
            setLoading(false);
            return;
        }

        // Если пароль верный — переходим к вводу кода
        setStep('code');
        setLoading(false);
    };

    // Шаг 2: Ввод кода из почты
    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            email: email.toLowerCase().trim(),
            password,           // нужно передать ещё раз
            twoFactorCode: code,
            redirect: false,
        });

        if (result?.error) {
            setError('Неверный или просроченный код');
            setLoading(false);
            return;
        }

        router.push('/admin');
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

                {step === 'credentials' ? (
                    // === ШАГ 1: Email + Пароль ===
                    <form onSubmit={handleCredentialsSubmit} className="space-y-6">
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
                            {loading ? 'Проверяем...' : 'Продолжить'}
                        </button>
                    </form>
                ) : (
                    // === ШАГ 2: Ввод кода ===
                    <form onSubmit={handleCodeSubmit} className="space-y-6">
                        <div className="text-center">
                            <Mail className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">Введите код</h2>
                            <p className="text-zinc-400">
                                Мы отправили 6-значный код на <br />
                                <strong>{email}</strong>
                            </p>
                        </div>

                        <input
                            type="text"
                            inputMode="numeric"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            className="w-full text-center text-5xl tracking-[12px] bg-zinc-800 border border-zinc-700 rounded-2xl py-8 focus:border-yellow-400 outline-none font-mono"
                            maxLength={6}
                            required
                        />

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading || code.length !== 6}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700 text-black font-semibold py-4 rounded-2xl transition"
                        >
                            {loading ? 'Проверяем код...' : 'Войти в админку'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep('credentials');
                                setCode('');
                                setError('');
                            }}
                            className="text-zinc-400 hover:text-white text-sm w-full"
                        >
                            ← Изменить email или пароль
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}