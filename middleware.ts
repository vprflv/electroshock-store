// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === 'ADMIN';

    // Разрешаем /admin/login всегда
    if (nextUrl.pathname === '/admin/login') {
        if (isLoggedIn && isAdmin) {
            return NextResponse.redirect(new URL('/admin', nextUrl));
        }
        return NextResponse.next();
    }

    // Защищаем все остальные /admin пути
    if (nextUrl.pathname.startsWith('/admin')) {
        if (!isLoggedIn || !isAdmin) {
            const loginUrl = new URL('/admin/login', nextUrl);
            loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
});

// Важно: заставляем middleware работать на Node.js
export const runtime = 'nodejs';

// Matcher
export const config = {
    matcher: ['/admin/:path*'],
};