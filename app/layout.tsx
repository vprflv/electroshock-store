import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import {SessionProvider} from "next-auth/react";   // ← Добавь этот импорт

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: 'ElectroShock Store — Электрошокеры и средства самозащиты',
    description: 'Магазин электрошокеров с доставкой по России',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <SessionProvider>
        <Providers>
            {children}
        </Providers>

        {/* Toaster должен быть на самом верхнем уровне */}
        <Toaster
            position="top-right"
            richColors
            closeButton
            theme="dark"
            duration={4000}
        />
        </SessionProvider>
        </body>
        </html>
    );
}