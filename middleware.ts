// middleware.ts

import { NextResponse } from 'next/server';
import {auth} from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Страница логина
    if (nextUrl.pathname === '/admin/login') {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/admin', nextUrl));
        }
        return NextResponse.next();
    }

    // Защита всех остальных страниц /admin/*
    if (nextUrl.pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/admin/login', nextUrl));
        }

        // Проверка роли ADMIN
        if (req.auth?.user?.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/login', nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};