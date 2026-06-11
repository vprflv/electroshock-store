'use client';

import { Upload, X, Trash2 } from 'lucide-react';
import Image from 'next/image';

type ProductImageUploadProps = {
    images: File[];
    previews: string[];
    existingImages?: string[];
    onImagesChange: (files: File[]) => void;
    onPreviewsChange: (previews: string[]) => void;
    onExistingImagesChange?: (images: string[]) => void;
};

export default function ProductImageUpload({
                                               images,
                                               previews,
                                               existingImages = [],
                                               onImagesChange,
                                               onPreviewsChange,
                                               onExistingImagesChange,
                                           }: ProductImageUploadProps) {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Добавляем файлы
        onImagesChange([...images, ...files]);

        // Создаём превью
        const newPreviews = files.map(file => URL.createObjectURL(file));
        onPreviewsChange([...previews, ...newPreviews]);
    };

    const removeNewImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));

        const newPreviews = previews.filter((_, i) => i !== index);
        URL.revokeObjectURL(previews[index]); // очистка памяти
        onPreviewsChange(newPreviews);
    };

    const removeExistingImage = (index: number) => {
        if (!onExistingImagesChange) return;
        const updated = existingImages.filter((_, i) => i !== index);
        onExistingImagesChange(updated);
    };

    return (
        <div>
            <label className="block text-sm mb-3">Изображения товара</label>

            {/* Загрузка */}
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-yellow-400/50 transition mb-8">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-12 h-12 text-yellow-400 mb-3" />
                    <p className="font-medium">Нажмите или перетащите новые изображения</p>
                    <p className="text-sm text-zinc-500 mt-1">PNG, JPG, WebP (до 10 МБ)</p>
                </label>
            </div>

            {/* Текущие изображения */}
            {existingImages.length > 0 && (
                <div className="mb-8">
                    <p className="text-sm text-zinc-400 mb-4">Текущие изображения ({existingImages.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((url, idx) => (
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
                                    onClick={() => removeExistingImage(idx)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Новые изображения — этот блок должен появляться */}
            {previews.length > 0 && (
                <div>
                    <p className="text-sm text-zinc-400 mb-4">Новые изображения ({previews.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {previews.map((preview, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden border border-zinc-700">
                                <img
                                    src={preview}
                                    alt={`new-${idx}`}
                                    className="w-full aspect-square object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(idx)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {existingImages.length === 0 && previews.length === 0 && (
                <p className="text-zinc-500 text-center py-12 border border-dashed border-zinc-700 rounded-2xl">
                    Пока нет изображений
                </p>
            )}
        </div>
    );
}