// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === 'ADMIN';

    if (nextUrl.pathname === '/admin/login') {
        if (isLoggedIn && isAdmin) {
            return NextResponse.redirect(new URL('/admin', nextUrl));
        }
        return NextResponse.next();
    }

    if (nextUrl.pathname.startsWith('/admin') && nextUrl.pathname !== '/admin/login') {
        if (!isLoggedIn || !isAdmin) {
            const loginUrl = new URL('/admin/login', nextUrl);
            loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};