'use client';

import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';

import AdminHeader from "@/features/admin/layout/header/components/AdminHeader";
import AdminSidebar from "@/features/admin/layout/sidebar/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Основная область */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <AdminHeader>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-3 -ml-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all active:scale-95"
                    >
                        <Menu size={28} />
                    </button>
                </AdminHeader>

                {/* Контент */}
                <main className="flex-1 overflow-auto bg-zinc-950 p-4 md:p-6">
                    {children}
                </main>
            </div>

            {/* Overlay для мобильного меню */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}