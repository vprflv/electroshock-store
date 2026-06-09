'use client';

import { Upload, X } from 'lucide-react';

type ProductImageUploadProps = {
    images: File[];
    previews: string[];
    onImagesChange: (files: File[]) => void;
    onPreviewsChange: (previews: string[]) => void;
};

export default function ProductImageUpload({
                                               images,
                                               previews,
                                               onImagesChange,
                                               onPreviewsChange,
                                           }: ProductImageUploadProps) {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        onImagesChange([...images, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        onPreviewsChange([...previews, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));

        const newPreviews = previews.filter((_, i) => i !== index);
        URL.revokeObjectURL(previews[index]);
        onPreviewsChange(newPreviews);
    };

    return (
        <div>
            <label className="block text-sm mb-3">Изображения товара</label>

            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-yellow-400/50 transition">
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
                    <p>Нажмите или перетащите изображения</p>
                    <p className="text-sm text-zinc-500 mt-1">PNG, JPG, WebP (до 10 МБ каждое)</p>
                </label>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {previews.map((preview, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-xl border border-zinc-700"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute -top-2 -right-2 bg-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}