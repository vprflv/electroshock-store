'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useCategories } from "@/features/admin/products/new/hooks/useCategories";
import { useBrands } from "@/features/admin/products/new/hooks/useBrands";
import { useSpecs } from "@/features/admin/products/new/hooks/useSpecs";
import { revalidateAllProducts } from "@/features/actions/productActions";

const productSchema = z.object({
    name: z.string().min(3, 'Название должно быть минимум 3 символа'),
    article: z.string().min(2, 'Артикул обязателен'),
    price: z.string().min(1, 'Цена обязательна').regex(/^\d+$/, 'Цена должна быть числом'),
    oldPrice: z.string().optional(),
    stock: z.string().min(1, 'Остаток обязателен').regex(/^\d+$/, 'Остаток должен быть числом'),
    description: z.string().min(10, 'Описание должно быть минимум 10 символов'),
    categoryId: z.string().min(1, 'Выберите категорию'),
    brandId: z.string().min(1, 'Выберите бренд'),
});

type ProductFormData = z.infer<typeof productSchema>;

export function useEditProduct(productId: number) {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const { categories, addCategory, refetch: refetchCategories } = useCategories();
    const { brands, addBrand, refetch: refetchBrands } = useBrands();
    const { specs, updateSpecs } = useSpecs();

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: { stock: '0', price: '0', oldPrice: '' },
    });

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition";

    // Один единственный запрос при монтировании
    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            try {
                const res = await fetch(`/api/admin/products/${productId}`, {
                    cache: 'no-store',
                });

                if (!res.ok) throw new Error();

                const product = await res.json();

                if (!isMounted) return;

                setExistingImages(product.images || []);

                form.reset({
                    name: product.name,
                    article: product.article,
                    price: product.price.toString(),
                    oldPrice: product.oldPrice?.toString() || '',
                    stock: product.stock.toString(),
                    description: product.description,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                });

                if (product.specs) {
                    const specArray = Object.entries(product.specs).map(([key, value]) => ({
                        key,
                        value: String(value),
                    }));
                    updateSpecs(specArray);
                }
            } catch (err) {
                toast.error('Ошибка загрузки товара');
            } finally {
                setInitialLoading(false);
            }
        };

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, [productId]); // ← Только productId — это самое важное

    const onSubmit = async (data: ProductFormData) => {
        setIsLoading(true);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value);
        });

        if (specs.length > 0) {
            const specsObj = specs.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>);
            formData.append('specs', JSON.stringify(specsObj));
        }

        images.forEach(file => formData.append('images', file));

        try {
            const res = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) throw new Error();

            await revalidateAllProducts();
            toast.success('✅ Товар успешно обновлён!');
            window.location.href = '/admin/products';
        } catch (err: any) {
            toast.error(err.message || 'Ошибка при сохранении');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        inputClass,
        images,
        setImages,
        previews,
        setPreviews,
        existingImages,
        setExistingImages,
        isLoading,
        initialLoading,
        onSubmit,
        categories,
        brands,
        specs,
        updateSpecs,
        addCategory,
        addBrand,
        refetchCategories,
        refetchBrands,
    };
}