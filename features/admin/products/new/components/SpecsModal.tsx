'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Spec = { key: string; value: string };

type SpecsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    specs: Spec[];
    onSave: (specs: Spec[]) => void;
};

export default function SpecsModal({ isOpen, onClose, specs, onSave }: SpecsModalProps) {
    const [currentSpecs, setCurrentSpecs] = useState<Spec[]>(specs);
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const addSpec = () => {
        if (!newKey.trim() || !newValue.trim()) return;

        setCurrentSpecs(prev => [...prev, {
            key: newKey.trim(),
            value: newValue.trim()
        }]);

        setNewKey('');
        setNewValue('');
    };

    const removeSpec = (index: number) => {
        setCurrentSpecs(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave(currentSpecs);
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-lg z-50 max-h-[90vh] overflow-auto">
                    <Dialog.Title className="text-2xl font-bold mb-6">Характеристики товара</Dialog.Title>

                    {/* Список уже добавленных характеристик */}
                    <div className="mb-6 space-y-2 max-h-60 overflow-auto">
                        {currentSpecs.length === 0 ? (
                            <p className="text-zinc-500 text-center py-4">Характеристики пока не добавлены</p>
                        ) : (
                            currentSpecs.map((spec, index) => (
                                <div key={index} className="flex items-center gap-3 bg-zinc-800 rounded-lg p-3 group">
                                    <div className="flex-1">
                                        <span className="text-yellow-400 font-medium">{spec.key}</span>
                                        <span className="text-zinc-400 mx-2">→</span>
                                        <span>{spec.value}</span>
                                    </div>
                                    <button
                                        onClick={() => removeSpec(index)}
                                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Форма добавления новой характеристики */}
                    <div className="border-t border-zinc-700 pt-6">
                        <p className="text-sm text-zinc-400 mb-3">Добавить новую характеристику</p>

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={newKey}
                                onChange={(e) => setNewKey(e.target.value)}
                                placeholder="Название (например: Напряжение)"
                                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                            />
                            <input
                                type="text"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                placeholder="Значение (например: 1102V)"
                                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                            />
                        </div>

                        <button
                            onClick={addSpec}
                            disabled={!newKey.trim() || !newValue.trim()}
                            className="mt-3 w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить характеристику
                        </button>
                    </div>

                    {/* Кнопки сохранения */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                        >
                            Сохранить характеристики ({currentSpecs.length})
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}