'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

import { useAdminProduct } from "@/features/admin/products/hooks/useAdminProduct";
import { useCategories } from "@/features/admin/products/new/hooks/useCategories";
import { useBrands } from "@/features/admin/products/new/hooks/useBrands";
import { useSpecs } from "@/features/admin/products/new/hooks/useSpecs";
import { revalidateAllProducts } from "@/features/actions/productActions";

const productSchema = z.object({
    name: z.string().min(3, 'Название должно быть минимум 3 символа'),
    article: z.string().min(2, 'Артикул обязателен'),
    price: z.string().min(1).regex(/^\d+$/, 'Цена должна быть числом'),
    oldPrice: z.string().optional(),
    stock: z.string().min(1).regex(/^\d+$/, 'Остаток должен быть числом'),
    description: z.string().min(10, 'Описание минимум 10 символов'),
    categoryId: z.string().min(1, 'Выберите категорию'),
    brandId: z.string().min(1, 'Выберите бренд'),
});

type ProductFormData = z.infer<typeof productSchema>;

export function useEditProduct(productId: number) {
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [currentImagePaths, setCurrentImagePaths] = useState<string[]>([]);
    const [currentImageUrls, setCurrentImageUrls] = useState<string[]>([]);

    const [isSaving, setIsSaving] = useState(false);
    const hasInitialized = useRef(false);

    const { data: product, isLoading: initialLoading } = useAdminProduct(productId);
    const { categories, addCategory, refetch: refetchCategories } = useCategories();
    const { brands, addBrand, refetch: refetchBrands } = useBrands();
    const { specs, updateSpecs } = useSpecs();

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            stock: '0',
            price: '0',
            oldPrice: '',
        },
    });

    const inputClass = "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition";

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    useEffect(() => {
        if (!product || hasInitialized.current) return;

        hasInitialized.current = true;

        const imagePaths = product.imagePaths || [];
        const imageUrls = product.images || [];

        setCurrentImagePaths(imagePaths);
        setCurrentImageUrls(imageUrls);
        setNewFiles([]);
        setNewPreviews([]);

        form.reset({
            name: product.name,
            article: product.article,
            price: product.price.toString(),
            oldPrice: product.oldPrice?.toString() || '',
            stock: product.stock.toString(),
            description: product.description,
            categoryId: String(product.categoryId || ''),
            brandId: String(product.brandId || ''),
        });

        if (product.specs) {
            const specArray = Object.entries(product.specs).map(([key, value]) => ({
                key,
                value: String(value),
            }));
            updateSpecs(specArray);
        }
    }, [product, form, updateSpecs]);

    // ==================== РАБОТА С ИЗОБРАЖЕНИЯМИ ====================
    const addNewImages = useCallback((files: File[]) => {
        const previews = files.map(file => URL.createObjectURL(file));
        setNewFiles(prev => [...prev, ...files]);
        setNewPreviews(prev => [...prev, ...previews]);
    }, []);

    const removeCurrentImage = useCallback((index: number) => {
        setCurrentImagePaths(prev => prev.filter((_, i) => i !== index));
        setCurrentImageUrls(prev => prev.filter((_, i) => i !== index));
    }, []);

    const removeNewImage = useCallback((index: number) => {
        const previewUrl = newPreviews[index];
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setNewPreviews(prev => prev.filter((_, i) => i !== index));
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    }, [newPreviews]);

    // Очистка memory leak при размонтировании
    useEffect(() => {
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [newPreviews]);

    // ==================== ОТПРАВКА ====================
    const onSubmit = async (data: ProductFormData) => {
        setIsSaving(true);

        const formData = new FormData();

        // Основные поля
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        // Specs
        if (specs.length > 0) {
            const specsObj = specs.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>);
            formData.append('specs', JSON.stringify(specsObj));
        }

        // === Изображения ===
        console.log('=== DEBUG BEFORE SEND ===');
        console.log('newFiles count:', newFiles.length);
        console.log('remainingImagePaths:', currentImagePaths);

        newFiles.forEach((file, i) => {
            formData.append('images', file);
            console.log(`Appended file ${i + 1}: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
        });

        formData.append('remainingImagePaths', JSON.stringify(currentImagePaths));

        try {
            const res = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await res.json();
            console.log('Server response:', result);

            if (!res.ok) throw new Error(result.error || 'Ошибка обновления товара');

            await revalidateAllProducts();
            toast.success('Товар успешно обновлён!');

            // Небольшая задержка перед редиректом (чтобы revalidate успел)
            setTimeout(() => {
                window.location.href = '/admin/products';
            }, 400);

        } catch (err: any) {
            console.error('Submit error:', err);
            toast.error(err.message || 'Ошибка при сохранении');
        } finally {
            setIsSaving(false);
        }
    };

    return {
        form,
        inputClass,
        currentImages: currentImageUrls,        // для отображения
        currentImagePaths,                      // для remaining
        newPreviews,
        newFiles,
        addNewImages,
        removeCurrentImage,
        removeNewImage,
        isLoading: isSaving,
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