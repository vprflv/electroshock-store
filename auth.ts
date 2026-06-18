// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';

import { authConfig } from './auth.config';
import { sendTwoFactorCode } from '@/lib/email';

class TwoFactorRequiredError extends CredentialsSignin {
    code = '2FA_REQUIRED';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,

    adapter: PrismaAdapter(prisma),

    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Пароль', type: 'password' },
                twoFactorCode: { label: 'Код', type: 'text' },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = (credentials.email as string).toLowerCase().trim();
                const twoFactorCode = credentials.twoFactorCode as string | undefined;

                const user = await prisma.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        password: true,
                        role: true,
                        twoFactorCode: true,
                        twoFactorCodeExpires: true,
                    },
                });

                if (!user || !user.password) return null;

                const isValidPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValidPassword) return null;

                // === Если введён код 2FA ===
                if (twoFactorCode) {
                    if (!user.twoFactorCode || !user.twoFactorCodeExpires) return null;
                    if (new Date() > user.twoFactorCodeExpires) return null;
                    if (user.twoFactorCode !== twoFactorCode) return null;

                    await prisma.user.update({
                        where: { id: user.id },
                        data: { twoFactorCode: null, twoFactorCodeExpires: null },
                    });

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                }

                // === Отправка кода 2FA ===
                const code = Math.floor(100000 + Math.random() * 900000).toString();

                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        twoFactorCode: code,
                        twoFactorCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
                    },
                });

                // Отправляем код напрямую (убрали fetch)
                await sendTwoFactorCode(user.email, code).catch(err => {
                    console.error('Не удалось отправить код 2FA:', err);
                });

                // Правильный способ бросить ошибку 2FA в NextAuth v5
                throw new TwoFactorRequiredError();
            },
        }),
    ],
});
