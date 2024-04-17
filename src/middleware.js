import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup'

    const { token } = request.cookies.get('data')?.value ? JSON.parse(request.cookies.get('data')?.value) : '';

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard/course/all', request.url))
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard/course/all',
        '/dashboard/course/add',
    ],
}