// middleware.ts
import { serverAuth, useAuth } from '@/hooks/auth';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const is_auth=await serverAuth({request});

    if(await is_auth) {
        const response=NextResponse.next();
        response.cookies.set('authenticated',Date.now().toString());
        return response
    }
    return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/post/:path*',
    ],
}