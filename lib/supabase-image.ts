const CLOUDINARY_CLOUD_NAME = 'derk1fu4e'; // ← твой cloud name

export const getImageUrl = (
    filename?: string | null,
    width: number = 800,
    quality: string = 'auto'
): string => {
    if (!filename) {
        return '/images/placeholder-product.jpg'; // лучше с ведущим слешем
    }

    // Если уже полный URL (например, уже через Cloudinary)
    if (filename.startsWith('http')) {
        // Если это Supabase — оборачиваем в Cloudinary
        if (filename.includes('supabase.co')) {
            return getCloudinaryUrl(filename, width, quality);
        }
        return filename; // уже оптимизированный или другой хост
    }

    // Обычный filename из Supabase
    const SUPABASE_PUBLIC_URL = 'https://wxbhvhqqtimovksbulxd.supabase.co';
    const fullSupabaseUrl = `${SUPABASE_PUBLIC_URL}/storage/v1/object/public/product-images/${filename}`;

    return getCloudinaryUrl(fullSupabaseUrl, width, quality);
};

// Вспомогательная функция
const getCloudinaryUrl = (supabaseUrl: string, width: number = 800, quality: string = 'auto'): string => {
    const encodedUrl = encodeURIComponent(supabaseUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/w_${width},q_${quality},f_auto/${encodedUrl}`;
};