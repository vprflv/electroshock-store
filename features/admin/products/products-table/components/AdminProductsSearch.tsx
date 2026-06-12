'use client';

import { Search } from 'lucide-react';

interface AdminProductsSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AdminProductsSearch({ value, onChange }: AdminProductsSearchProps) {
    return (
        <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-3.5 text-zinc-500" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск по названию или артикулу..."
                className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3.5 rounded-2xl focus:border-yellow-400 outline-none text-base"
            />
        </div>
    );
}