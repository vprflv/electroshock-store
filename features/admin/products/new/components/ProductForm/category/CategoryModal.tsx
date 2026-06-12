'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

type CategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (category: { id: string; name: string }) => void;
};

export default function CategoryModal({ isOpen, onClose, onSuccess }: CategoryModalProps) {
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;

        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            });

            if (res.ok) {
                const newCategory = await res.json();
                onSuccess(newCategory);
                setName('');
                onClose();
            } else {
                alert('Ошибка при создании категории');
            }
        } catch (e) {
            alert('Ошибка соединения');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />

                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-zinc-900 border border-zinc-700 rounded-3xl md:rounded-2xl
                    w-full max-w-md mx-4 md:mx-0 z-50 overflow-hidden">

                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-zinc-700">
                        <Dialog.Title className="text-xl md:text-2xl font-bold text-white">
                            Новая категория
                        </Dialog.Title>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Название категории
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Например: Электрошокеры"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4
                                           text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none text-base"
                                autoFocus
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3.5 border border-zinc-700 rounded-2xl text-white hover:bg-zinc-800 transition font-medium"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!name.trim() || isSaving}
                                className="flex-1 py-3.5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-700
                                           text-black font-semibold rounded-2xl transition disabled:opacity-50"
                            >
                                {isSaving ? 'Сохраняем...' : 'Создать'}
                            </button>
                        </div>
                    </div>

                    {/* Кнопка закрытия */}
                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition">
                            <X className="w-5 h-5" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}