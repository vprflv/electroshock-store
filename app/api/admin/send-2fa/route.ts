// app/api/admin/send-2fa/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTwoFactorCode } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorCode: code,
                twoFactorCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        await sendTwoFactorCode(email, code);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
    }
}