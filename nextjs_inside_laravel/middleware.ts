// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { ironOptions } from './lib/iron_config';
import { getIronSession } from "iron-session/edge";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const response=NextResponse.next();
    console.log(process.env.BUILDTIME);
    if(process.env.BUILDTIME){return response;}
    const redirect_res=NextResponse.redirect(new URL('/login', request.url));
    const session = await getIronSession(request, response,ironOptions);
    console.log('session',session);
    if(request.url.match("/logout")){
        redirect_res.cookies.delete('last_page');
        redirect_res.cookies.delete('laravel_session');
        await session.destroy();
        return redirect_res
    }
    response.cookies.set('last_page',new URL(request.url).pathname);
    if(session.user){
        return response;
    }
    redirect_res.cookies.set('last_page',new URL(request.url).pathname);

    return redirect_res
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/post/:path*',
        '/logout',
    ],
}