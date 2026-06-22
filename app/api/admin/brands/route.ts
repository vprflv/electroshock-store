// app/api/admin/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {revalidateBrandsAndCategories} from "@/features/actions/productActions";

export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: 'Название бренда слишком короткое' }, { status: 400 });
        }

        const trimmedName = name.trim();

        const brand = await prisma.brand.create({
            data: {
                name: trimmedName,
                slug: trimmedName.toLowerCase()
                    .replace(/[^a-zа-я0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, ''),
            },
        });

       await revalidateBrandsAndCategories()

        return NextResponse.json(brand, { status: 201 });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({
                error: 'Бренд с таким названием уже существует'
            }, { status: 409 });
        }

        console.error('Brand creation error:', error);
        return NextResponse.json({ error: 'Ошибка создания бренда' }, { status: 500 });
    }
}