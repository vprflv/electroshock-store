import { getImageUrl } from '@/lib/supabase';

export const getProductImage = (product: any, index: number = 0): string => {
    if (!product) return 'https://picsum.photos/id/106/600/600';

    // Новый правильный способ
    if (product.imagePaths?.length > 0) {
        return getImageUrl(product.imagePaths[index]);
    }

    // Старый picsum (на время перехода)
    if (product.images?.length > 0) {
        return product.images[index];
    }

    return 'https://picsum.photos/id/106/600/600';
};