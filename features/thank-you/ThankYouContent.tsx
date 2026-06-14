'use client';import Link from 'next/link';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';



export default function ThankYouContent() {
    const searchParams = useSearchParams();
    const router = useRouter();const orderNumber = searchParams.get('orderNumber');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const hasProcessed = useRef(false); // ← Защита от двойного срабатывания

    useEffect(() => {
        console.log('=== ThankYouPage DEBUG ===');
        console.log('orderNumber:', orderNumber);
        console.log('justOrdered in localStorage:', localStorage.getItem('justOrdered'));

        if (!orderNumber) {
            console.log('→ Нет orderNumber → редирект');
            router.replace('/');
            return;
        }

        if (hasProcessed.current) return; // ← предотвращаем второй запуск
        hasProcessed.current = true;

        const justOrdered = localStorage.getItem('justOrdered');

        if (justOrdered === 'true') {
            console.log('→ Успешно! Показываем страницу благодарности');
            setIsValid(true);
            localStorage.removeItem('justOrdered');
        } else {
            console.log('→ Прямой доступ → редирект на главную');
            router.replace('/');
        }
    }, [orderNumber, router]);

    if (isValid === null) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-zinc-400">Проверка доступа...</div>
            </div>
        );
    }

    if (!isValid) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto mb-8 flex justify-center">
                    <div className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                    </div>
                </div>

                <h1 className="text-5xl font-bold mb-4">Спасибо!</h1>
                <p className="text-2xl text-zinc-300 mb-3">Ваш заказ успешно оформлен</p>
                <p className="text-zinc-400 mb-12">
                    Мы свяжемся с вами в ближайшее время для подтверждения деталей.
                </p>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-1">Номер заказа</p>
                    <p className="text-3xl font-mono font-bold text-yellow-400">
                        #{orderNumber}
                    </p>
                    <p className="text-sm text-zinc-500 mt-4">
                        Статус: <span className="text-green-500 font-medium">Принят в обработку</span>
                    </p>
                </div>

                <Link
                    href="/"
                    className="group flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-5 rounded-2xl transition-all text-lg"
                >
                    <Home className="w-5 h-5" />
                    Вернуться на главную
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
            </div>
        </div>
    );}

