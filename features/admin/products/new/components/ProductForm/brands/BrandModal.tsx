'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

            const data = await res.json();

            if (res.ok) {
                toast.success('Бренд успешно создан!', {
                    description: data.name,
                });
                onSuccess(data);
                setName('');
                onClose();
            } else {
                if (res.status === 409) {
                    toast.error('Бренд уже существует', {
                        description: data.error || 'Попробуйте другое название',
                    });
                } else if (res.status === 400) {
                    toast.error(data.error || 'Некорректные данные');
                } else {
                    toast.error('Ошибка при создании бренда');
                }
            }
        } catch (e) {
            toast.error('Ошибка соединения с сервером');
        } finally {
            setIsSaving(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setName('');
        }
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />

                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-zinc-900 border border-zinc-700 rounded-3xl md:rounded-2xl
                    w-full max-w-md mx-4 z-50 overflow-hidden">

                    <div className="px-6 pt-6 pb-4 border-b border-zinc-700">
                        <Dialog.Title className="text-xl md:text-2xl font-bold text-white">
                            Новый бренд
                        </Dialog.Title>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Название бренда
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Например: Police"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4
                                           text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none text-base"
                                autoFocus
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3.5 border border-zinc-700 rounded-2xl text-white
                                           hover:bg-zinc-800 transition font-medium"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!name.trim() || isSaving}
                                className="flex-1 py-3.5 bg-yellow-400 text-black font-semibold rounded-2xl
                                           hover:bg-yellow-500 disabled:bg-zinc-700 disabled:opacity-50 transition"
                            >
                                {isSaving ? 'Сохраняем...' : 'Создать бренд'}
                            </button>
                        </div>
                    </div>

                    <Dialog.Close asChild>
                        <button className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white transition">
                            <X className="w-6 h-6" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}