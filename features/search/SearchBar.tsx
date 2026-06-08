'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function SearchBar({
                                      value,
                                      onChange,
                                      placeholder = "Поиск по названию, артикулу или бренду...",
                                      className = "",
                                  }: SearchBarProps) {
    const [localValue, setLocalValue] = useState(value);

    // Синхронизация с внешним состоянием
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };

    return (
        <div className={`relative max-w-2xl mx-auto ${className}`}>
            <div className="relative">
                <Search className="absolute left-5 top-4 text-zinc-500 w-6 h-6" />

                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => {
                        setLocalValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="w-full bg-zinc-950 pl-14 pr-12 py-4 rounded-3xl
                               text-lg
                               border border-zinc-950
                               focus:border-yellow-200
                               focus:ring-2 focus:ring-yellow-400/30
                               placeholder:text-zinc-500
                               transition-all duration-200
                               outline-none"
                />

                {localValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-5 top-4 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}