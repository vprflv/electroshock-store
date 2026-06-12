
'use client';

import { Search } from 'lucide-react';

interface AdminOrdersSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AdminOrdersSearch({ value, onChange }: AdminOrdersSearchProps) {
    return (
        <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-3.5 text-zinc-500" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск по номеру, клиенту или телефону..."
                className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3.5 rounded-2xl focus:border-yellow-400 outline-none text-base"
            />
        </div>
    );
}