'use server';

import { prisma } from '@/lib/prisma';
import {toPlain} from "@/lib/utils/toPlain";


// Лёгкая версия для каталога (быстрая загрузка)
export async function getAllLightProducts() {
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
            voltage: true,
            category: { select: { id: true, name: true, slug: true } },
            brand:    { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return toPlain(products);
}


export async function getProductById(id: number) {
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
}

// Для фильтров
export async function getBrands() {
    const brands = await prisma.brand.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
    });
    return toPlain(brands);
}

export async function getCategories() {
    const categories = await prisma.category.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
    });
    return toPlain(categories);
}

export async function searchProducts(query: string) {
    if (!query?.trim()) return [];

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { article: { contains: query, mode: 'insensitive' } },
            ],
        },
        select: {
            id: true,
            article: true,
            name: true,
            price: true,
            oldPrice: true,
            stock: true,
            images: true,
            voltage: true,
            categoryId: true,
            brandId: true,
        },
        take: 30,
        orderBy: { createdAt: 'desc' },
    });

    return toPlain(products);
}