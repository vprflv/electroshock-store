// features/admin/products/new/components/ProductForm/brands/DeleteBrandModal.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    brands: { id: string; name: string }[];
    onDeleted: () => void;
};

export default function DeleteBrandModal({ isOpen, onClose, brands, onDeleted }: Props) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        setIsDeleting(true);

        try {
            const promises = selectedIds.map(id =>
                fetch(`/api/admin/brands/${id}`, { method: 'DELETE' })
                    .then(async (res) => {
                        if (!res.ok) {
                            const errorData = await res.json().catch(() => ({}));
                            throw new Error(errorData.error || 'Не удалось удалить бренд');
                        }
                    })
            );

            await Promise.all(promises);

            toast.success(`Успешно удалено ${selectedIds.length} бренд${selectedIds.length > 1 ? 'ов' : ''}`);
            onDeleted();
            setSelectedIds([]);
            onClose();
        } catch (err: any) {
            toast.error(err.message || 'Произошла ошибка при удалении');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />

                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-zinc-900 border border-zinc-700 rounded-3xl md:rounded-2xl
                    w-full max-w-md mx-4 z-50 max-h-[90vh] flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-zinc-700 flex items-center gap-3">
                        <Trash2 className="w-6 h-6 text-red-500" />
                        <Dialog.Title className="text-xl font-bold text-white">
                            Удалить бренды
                        </Dialog.Title>
                    </div>

                    {/* Список брендов */}
                    <div className="flex-1 overflow-auto p-6 space-y-2">
                        {brands.length === 0 ? (
                            <p className="text-zinc-400 py-12 text-center">Нет брендов для удаления</p>
                        ) : (
                            brands.map(brand => (
                                <label
                                    key={brand.id}
                                    className="flex items-center gap-3 p-4 hover:bg-zinc-800 rounded-2xl cursor-pointer transition group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(brand.id)}
                                        onChange={() => toggleSelect(brand.id)}
                                        className="w-5 h-5 accent-red-600 rounded"
                                    />
                                    <span className="text-base text-white flex-1">
                                        {brand.name}
                                    </span>
                                </label>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-zinc-700 p-6 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 border border-zinc-700 rounded-2xl text-white hover:bg-zinc-800 transition font-medium"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={selectedIds.length === 0 || isDeleting}
                            className="flex-1 py-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700
                                       text-white font-semibold rounded-2xl transition disabled:opacity-50"
                        >
                            {isDeleting
                                ? `Удаляем (${selectedIds.length})...`
                                : `Удалить (${selectedIds.length})`}
                        </button>
                    </div>

                    {/* Кнопка закрытия */}
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