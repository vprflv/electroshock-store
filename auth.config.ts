// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    providers: [],

    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },

    session: {
        strategy: 'jwt'
    },

    trustHost: true,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};