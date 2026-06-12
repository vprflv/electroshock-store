// lib/images.ts
import { getImageUrl } from "@/lib/supabase-image";

export const getProductImage = (product: any, index: number = 0): string => {
    if (!product) {
        return '/placeholder-product.jpg';
    }

    // Новый формат (рекомендуемый)
    if (product.imagePaths?.length > 0) {
        return getImageUrl(product.imagePaths[index]);
    }

    // Старый формат (на время перехода)
    if (product.images?.length > 0) {
        return getImageUrl(product.images[index]);
    }

    return '/placeholder-product.jpg';
};

// Дополнительно — удобная функция для одного изображения
export const getFirstProductImage = (product: any): string => {
    return getProductImage(product, 0);
};