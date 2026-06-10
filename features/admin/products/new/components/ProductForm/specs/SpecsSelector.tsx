'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {Spec} from "@/features/admin/products/new/hooks/useSpecs";


type SpecsSelectorProps = {
    specs: Spec[];
    onUpdate: (specs: Spec[]) => void;
};

export default function SpecsSelector({ specs, onUpdate }: SpecsSelectorProps) {
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const addSpec = () => {
        if (!newKey.trim() || !newValue.trim()) return;

        const newSpec: Spec = {
            key: newKey.trim(),
            value: newValue.trim(),
        };

        onUpdate([...specs, newSpec]);
        setNewKey('');
        setNewValue('');
    };

    const removeSpec = (index: number) => {
        onUpdate(specs.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm mb-2">Характеристики товара</label>

            {/* Список добавленных характеристик */}
            {specs.length > 0 && (
                <div className="space-y-2 mb-4">
                    {specs.map((spec, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 group"
                        >
                            <div className="flex-1">
                                <span className="text-yellow-400 font-medium">{spec.key}</span>
                                <span className="text-zinc-500 mx-3">→</span>
                                <span className="text-zinc-300">{spec.value}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeSpec(index)}
                                className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Форма добавления новой характеристики */}
            <div className="border border-dashed border-zinc-700 rounded-2xl p-5">
                <p className="text-sm text-zinc-400 mb-3">Добавить новую характеристику</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder="Название (Например: Напряжение)"
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                    />
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Значение (Например: 1102V)"
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                    />
                </div>

                <button
                    type="button"
                    onClick={addSpec}
                    disabled={!newKey.trim() || !newValue.trim()}
                    className="mt-4 w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition"
                >
                    <Plus className="w-4 h-4" />
                    Добавить характеристику
                </button>
            </div>

            {specs.length > 0 && (
                <p className="text-sm text-zinc-400 text-center">
                    Добавлено характеристик: <span className="text-yellow-400">{specs.length}</span>
                </p>
            )}
        </div>
    );
}