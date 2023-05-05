// middleware.ts
import { serverAuth, useAuth } from '@/hooks/auth';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const user=await serverAuth({request});
    // const response= NextResponse.next();
    console.log('user',user);
    // return response;
    if(await user) return NextResponse.next();
    return NextResponse.next();
    // return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/post/:path*',
    ],
}