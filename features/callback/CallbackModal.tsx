'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';   // ← добавили

export default function CallbackModal({
                                          isOpen,
                                          onClose
                                      }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        comment: '',
    });
    const [agreePolicy, setAgreePolicy] = useState(false);   // ← новое состояние
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreePolicy) {
            toast.error('Необходимо согласиться с политикой конфиденциальности');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success('Заявка отправлена! Мы скоро перезвоним вам.', {
                    description: 'Обычно отвечаем в течение 10-15 минут'
                });
                onClose();
                setFormData({ name: '', phone: '', comment: '' });
                setAgreePolicy(false);
            } else {
                toast.error('Не удалось отправить заявку');
            }
        } catch {
            toast.error('Ошибка соединения. Попробуйте позже');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-md">
                <div className="flex justify-between px-6 py-5 border-b border-zinc-700">
                    <h2 className="text-2xl text-yellow-400 font-semibold">Перезвоните мне</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="w-6 h-6 hover:text-yellow-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="text-sm text-zinc-400 mb-1.5 block">Имя</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 focus:border-yellow-400"
                            placeholder="Как к вам обращаться?"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-400 mb-1.5 block">Телефон</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 focus:border-yellow-400"
                            placeholder="+7 (___) ___-__-__"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-400 mb-1.5 block">Комментарий (необязательно)</label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 min-h-[100px] focus:border-yellow-400"
                            placeholder="Когда удобно перезвонить? Есть вопросы..."
                        />
                    </div>

                    {/* Чекбокс согласия с политикой */}
                    <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreePolicy}
                                onChange={(e) => setAgreePolicy(e.target.checked)}
                                className="mt-1 w-5 h-5 accent-yellow-400"
                                required
                            />
                            <span className="text-sm text-zinc-400">
                                Я согласен с{' '}
                                <Link
                                    href="/policy/privacy"
                                    target="_blank"
                                    className="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                                >
                                    политикой конфиденциальности
                                </Link>{' '}
                                и условиями обработки персональных данных
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !agreePolicy}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-black font-semibold py-4 rounded-2xl transition"
                    >
                        {loading ? 'Отправляем...' : 'Отправить заявку'}
                    </button>
                </form>
            </div>
        </div>
    );
}