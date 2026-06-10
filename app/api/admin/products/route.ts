// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const article = formData.get('article') as string;
        const price = parseFloat(formData.get('price') as string);
        const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
        const stock = parseInt(formData.get('stock') as string);
        const description = formData.get('description') as string;
        const categoryId = formData.get('categoryId') as string;
        const brandId = formData.get('brandId') as string;

        const images = formData.getAll('images') as File[];

        const imageFilenames: string[] = [];

        // Создаём серверный клиент Supabase
        const supabase = await createServerSupabase();

        for (const image of images) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

            const { error } = await supabase.storage
                .from('product-images')
                .upload(fileName, image, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                console.error('Supabase upload error:', error);
                throw new Error(`Не удалось загрузить файл ${image.name}: ${error.message}`);
            }

            imageFilenames.push(fileName);
        }

        const product = await prisma.product.create({
            data: {
                name,
                article,
                price,
                oldPrice,
                stock,
                description,
                categoryId,
                brandId,
                imagePaths: imageFilenames,   // только имена файлов
                specs: {},
                features: [],
            },
        });

        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Ошибка создания товара'
        }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID не указан' }, { status: 400 });

        await prisma.product.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 });
    }
}