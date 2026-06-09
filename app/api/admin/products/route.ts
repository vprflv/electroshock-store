// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

        const imagePaths: string[] = [];
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
        await mkdir(uploadDir, { recursive: true });

        for (const image of images) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const filepath = path.join(uploadDir, filename);

            await writeFile(filepath, buffer);
            imagePaths.push(`/uploads/products/${filename}`);
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
                imagePaths,
                specs: {},
                features: [],
            },
        });

        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE (для кнопки удаления в таблице)
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