// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,

    adapter: PrismaAdapter(prisma),

    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Пароль', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = (credentials.email as string).toLowerCase().trim()

                const user = await prisma.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        password: true,
                        role: true,
                    },
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],

});