'use server';

import { prisma } from '@/lib/prisma';
import {toPlain} from "@/lib/utils/toPlain";
import {unstable_cache, revalidateTag , revalidatePath } from "next/cache";


// Лёгкая версия для каталога (быстрая загрузка)
export const getAllLightProducts = unstable_cache(
    async () => {
        const products = await prisma.product.findMany({
            where: { stock: { gt: 0 } },
            select: {
                id: true,
                article: true,
                name: true,
                price: true,
                oldPrice: true,
                stock: true,
                images: true,
                imagePaths: true,
                voltage: true,
                category: { select: { id: true, name: true, slug: true } },
                brand:    { select: { id: true, name: true, slug: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return toPlain(products);
    },
    ['all-light-products'],
    {
        revalidate: 300,
        tags: ['products', 'catalog'],
    }
);


// ==================== АДМИНКА ====================

export const getAllProductsForAdmin = unstable_cache(
    async () => {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                article: true,
                name: true,
                price: true,
                oldPrice: true,
                stock: true,
                images: true,
                imagePaths: true,
                createdAt: true,
                category: { select: { id: true, name: true } },
                brand:    { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return toPlain(products);
    },
    ['all-products-admin'],
    {
        revalidate: 60,           // 1 минута
        tags: ['admin-products'],
    }
);

// Детальный товар специально для редактирования
export const getProductForEdit = unstable_cache(
    async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                article: true,
                name: true,
                description: true,
                price: true,
                oldPrice: true,
                stock: true,
                images: true,
                imagePaths: true,
                specs: true,
                categoryId: true,
                brandId: true,
            },
        });

        if (!product) throw new Error('Товар не найден');
        return toPlain(product);
    },
    ['product-edit'],
    {
        revalidate: 300, // 5 минут
        tags: ['admin-products', 'product-edit'],
    }
);

// Инвалидация кэша
export const revalidateAllProducts = async () => {
    "use server";

    try {
        revalidateTag('products', 'default');
        revalidateTag('catalog', 'default');
        revalidateTag('all-light-products', 'default');
        revalidateTag('all-products-admin', 'default');
        revalidateTag('product', 'default');

        // Дополнительная инвалидация путей
        revalidatePath('/admin/products');
        revalidatePath('/admin');
        revalidatePath('/');
    } catch (error) {
        console.error('Revalidation error:', error);
    }
};






// Кэшированная версия детального товара
export const getProductById = unstable_cache(
    async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                article: true,
                name: true,
                description: true,
                price: true,
                oldPrice: true,
                stock: true,
                images: true,
                imagePaths: true,
                voltage: true,
                features: true,
                specs: true,
                createdAt: true,
                category: {
                    select: { name: true, slug: true }
                },
                brand: {
                    select: { name: true, slug: true }
                },
            },
        });

        if (!product) throw new Error('Товар не найден');

        return toPlain(product);
    },
    ['product', 'detail'],
    {
        revalidate: 600,
        tags: ['product', 'products'],
    }
);

// Для фильтров
export const getBrands = unstable_cache(
    async () => {
        const brands = await prisma.brand.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: 'asc' },
        });
        return toPlain(brands);
    },
    ['brands'],
    {
        revalidate: 3600,
        tags: ['brands'],
    }
);

export const getCategories = unstable_cache(
    async () => {
        const categories = await prisma.category.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: 'asc' },
        });
        return toPlain(categories);
    },
    ['categories'],
    {
        revalidate: 3600,
        tags: ['categories'],
    }
);

export const searchProducts = unstable_cache(
    async (query: string) => {
        if (!query?.trim()) return [];


        return [];
    },
    ['search-placeholder'],
    { revalidate: 3600 }
);