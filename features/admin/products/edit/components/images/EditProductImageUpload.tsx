'use client';

import { Upload, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

type Props = {
    currentImages: string[];
    newPreviews: string[];
    onAddNewImages: (files: File[]) => void;
    onRemoveCurrent: (index: number) => void;
    onRemoveNew: (index: number) => void;
};

export default function EditProductImageUpload({
                                                   currentImages,
                                                   newPreviews,
                                                   onAddNewImages,
                                                   onRemoveCurrent,
                                                   onRemoveNew,
                                               }: Props) {

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        onAddNewImages(files);
    }, [onAddNewImages]);

    return (
        <div className="space-y-8">
            <label className="block text-sm mb-3">Изображения товара</label>

            {/* === ТЕКУЩИЕ ИЗОБРАЖЕНИЯ === */}
            {currentImages.length > 0 && (
                <div>
                    <p className="text-sm text-zinc-400 mb-4">
                        Текущие изображения ({currentImages.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {currentImages.map((url, idx) => (
                            <div key={url} className="relative group rounded-xl overflow-hidden border border-zinc-700">
                                <Image
                                    src={url}
                                    alt={`current-${idx}`}
                                    width={300}
                                    height={300}
                                    className="w-full aspect-square object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemoveCurrent(idx)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* === НОВЫЕ ИЗОБРАЖЕНИЯ === */}
            {newPreviews.length > 0 && (
                <div>
                    <p className="text-sm text-zinc-400 mb-4">
                        Новые изображения ({newPreviews.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {newPreviews.map((preview, idx) => (
                            <div key={preview} className="relative group rounded-xl overflow-hidden border border-zinc-700"> {/* key=preview — важно! */}
                                <img
                                    src={preview}
                                    alt={`new-${idx}`}
                                    className="w-full aspect-square object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemoveNew(idx)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Загрузка новых */}
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-yellow-400/50 transition">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="edit-file-upload"
                />
                <label htmlFor="edit-file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-12 h-12 text-yellow-400 mb-3" />
                    <p className="font-medium">Добавить новые изображения</p>
                    <p className="text-sm text-zinc-500 mt-1">PNG, JPG, WebP (до 10 МБ)</p>
                </label>
            </div>
        </div>
    );
}