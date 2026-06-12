import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {auth} from "@/app/api/auth/[...nextauth]/route";


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;


        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
        }


        if (session.user.id === id) {
            return NextResponse.json({
                message: 'Вы не можете удалить самого себя!'
            }, { status: 403 });
        }

        const userToDelete = await prisma.user.findUnique({
            where: { id },
            select: { name: true }
        });

        if (!userToDelete) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }

        await prisma.user.delete({ where: { id } });

        return NextResponse.json({
            message: `Пользователь ${userToDelete.name} успешно удалён`
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Ошибка при удалении пользователя'
        }, { status: 500 });
    }
}