// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { ironOptions } from './lib/iron_config';
import { getIronSession } from "iron-session/edge";
import { IronSession } from 'iron-session';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    var response=NextResponse.next();

    if(process.env.BUILDTIME){return response;}

    const session = await getIronSession(request, response,ironOptions);

    response=await ensureHasLaravelSession({session,request,next:response});

    if(request.url.match("/logout")){
        const redirect_res=redirectToLoginWithLastPage({request});
        return await handleCookiesForLogout({session,request,next:redirect_res});
    }

    return authenticateBySession({session,request,next:response});
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/post/:path*',
        '/logout',
    ],
}

interface PartialMiddlewareParams{
    request:NextRequest,
    session:IronSession,
    next:NextResponse
}

export function redirectToLoginWithLastPage({request}:{request:NextRequest}){
    const redirect_res=NextResponse.redirect(new URL('/login', request.url));
    redirect_res.cookies.set('last_page',new URL(request.url).pathname);
    redirect_res.headers.set('x-middleware-cache', 'no-cache') // Disables middleware caching
    return redirect_res;
}

export function authenticateBySession({session,request,next}:PartialMiddlewareParams) {
    if(session.user){
        return next;
    }
    return redirectToLoginWithLastPage({request})
}

export async function ensureHasLaravelSession({request,session,next}:PartialMiddlewareParams){
    const laravel_session=request.cookies.get('laravel_session')?.value;
    if(!laravel_session){
        await session.destroy();
        return redirectToLoginWithLastPage({request});
    }
    return next;
}

export async function handleCookiesForLogout({session,next}:PartialMiddlewareParams){
    await session.destroy();
    next.cookies.delete('last_page');
    next.cookies.delete('laravel_session');
    return next
}
