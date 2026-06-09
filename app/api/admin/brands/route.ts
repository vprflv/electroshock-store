// app/api/admin/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
            return NextResponse.json({ error: 'Имя бренда слишком короткое' }, { status: 400 });
        }

        const brand = await prisma.brand.create({
            data: {
                name: name.trim(),
                slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
            },
        });

        return NextResponse.json(brand, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Такой бренд уже существует' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Ошибка создания бренда' }, { status: 500 });
    }
}