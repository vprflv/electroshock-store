import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createAdminSchema } from '@/features/admin/settings/schemas/userSchema';

export async function GET() {
    const users = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Валидация
        const validatedData = createAdminSchema.parse(body);

        // Проверяем, существует ли пользователь с таким email
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Пользователь с таким email уже существует' },
                { status: 409 }
            );
        }

        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Создаём администратора
        const newUser = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                role: 'ADMIN',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        return NextResponse.json({
            message: 'Администратор успешно создан',
            user: newUser,
        });

    } catch (error: any) {
        console.error(error);

        if (error.name === 'ZodError') {
            return NextResponse.json({
                message: 'Ошибка валидации',
                errors: error.errors
            }, { status: 400 });
        }

        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}