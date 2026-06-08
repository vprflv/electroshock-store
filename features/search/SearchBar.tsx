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

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };

    return (
        <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
            <div className="relative">
                {/* Иконка поиска */}
                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 sm:w-6 sm:h-6 transition-all" />

                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => {
                        setLocalValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="w-full
                               bg-zinc-950
                               border border-zinc-800
                               focus:border-yellow-400
                               focus:ring-2 focus:ring-yellow-400/20
                               rounded-3xl
                               pl-12 sm:pl-14
                               pr-12
                               py-3.5 sm:py-4
                               text-base sm:text-lg
                               placeholder:text-zinc-500
                               transition-all duration-200
                               outline-none"
                />

                {/* Кнопка очистки */}
                {localValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2
                                   text-zinc-500 hover:text-zinc-300
                                   p-1.5 -mr-1.5 active:scale-90 transition-all"
                        aria-label="Очистить поиск"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}