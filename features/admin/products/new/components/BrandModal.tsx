'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

type BrandModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (brand: { id: string; name: string }) => void;
};

export default function BrandModal({ isOpen, onClose, onSuccess }: BrandModalProps) {
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;

        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            });

            if (res.ok) {
                const newBrand = await res.json();
                onSuccess(newBrand);
                setName('');
            } else {
                alert('Ошибка при создании бренда');
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
                <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md z-50">
                    <Dialog.Title className="text-2xl font-bold mb-6">Новый бренд</Dialog.Title>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например: Police"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 mb-6 focus:border-yellow-400 outline-none"
                        autoFocus
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!name.trim() || isSaving}
                            className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition"
                        >
                            {isSaving ? 'Сохраняем...' : 'Создать бренд'}
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