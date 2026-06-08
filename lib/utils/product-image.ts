import { type Product } from '@/lib/mock-products';

/**
 * Возвращает главное (первое) изображение товара
 * С надёжной защитой от пустого массива
 */
export function getMainImage(product: Product): string {
    if (!product.images || product.images.length === 0) {
        return '/placeholder.jpg';
    }
    return product.images[0];
}

/**
 * Возвращает изображение по индексу (для галерей)
 * Если индекс некорректный — возвращает первое
 */
export function getProductImage(
    product: Product,
    index: number = 0
): string {
    if (!product.images || product.images.length === 0) {
        return '/placeholder.jpg';
    }
    return product.images[index] ?? product.images[0];
}