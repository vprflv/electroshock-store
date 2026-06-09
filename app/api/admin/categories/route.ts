// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: 'Имя категории слишком короткое' }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                name: name.trim(),
                slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
            },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Такая категория уже существует' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Ошибка создания категории' }, { status: 500 });
    }
}