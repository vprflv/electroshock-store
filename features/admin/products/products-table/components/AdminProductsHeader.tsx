'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface AdminProductsHeaderProps {
    totalProducts: number;
}

export default function AdminProductsHeader({ totalProducts }: AdminProductsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Товары</h1>
                <p className="text-zinc-400 text-sm md:text-base">
                    Всего товаров: <span className="text-white">{totalProducts}</span>
                </p>
            </div>

            <Link
                href="/admin/products/new"
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-2xl transition w-full sm:w-auto"
            >
                <Plus className="w-5 h-5" />
                Добавить товар
            </Link>
        </div>
    );
}