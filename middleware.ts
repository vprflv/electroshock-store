// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === 'ADMIN';

    // Если пользователь уже залогинен и пытается зайти на страницу логина
    if (nextUrl.pathname === '/admin/login') {
        if (isLoggedIn && isAdmin) {
            return NextResponse.redirect(new URL('/admin', nextUrl));
        }
        return NextResponse.next();
    }

    // Защита всех страниц /admin/*
    if (nextUrl.pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            const loginUrl = new URL('/admin/login', nextUrl);
            loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (!isAdmin) {
            return NextResponse.redirect(new URL('/admin/login', nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};