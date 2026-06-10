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
                <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-md z-50 max-h-[90vh] flex flex-col">
                    <Dialog.Title className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
                        <Trash2 className="w-5 h-5" />
                        Удалить бренды
                    </Dialog.Title>

                    <div className="flex-1 overflow-auto pr-2 space-y-2 mb-6">
                        {brands.length === 0 && (
                            <p className="text-zinc-400 py-8 text-center">Нет брендов</p>
                        )}
                        {brands.map(brand => (
                            <label
                                key={brand.id}
                                className="flex items-center gap-3 p-3 hover:bg-zinc-800 rounded-xl cursor-pointer transition"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(brand.id)}
                                    onChange={() => toggleSelect(brand.id)}
                                    className="w-5 h-5 accent-red-600"
                                />
                                <span className="text-base">{brand.name}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-700">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={selectedIds.length === 0 || isDeleting}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 rounded-lg font-medium transition"
                        >
                            {isDeleting
                                ? `Удаляем (${selectedIds.length})...`
                                : `Удалить (${selectedIds.length})`}
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