// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { ironOptions } from './lib/iron_config';
import { getIronSession } from "iron-session/edge";
import { IronSession } from 'iron-session';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    var next=NextResponse.next();

    if(process.env.BUILDTIME){return next;}

    const session = await getIronSession(request, next,ironOptions);

    var {next,terminate}=await ensureHasLaravelSession({session,request,next});

    if(request.url.match("/logout")){
        const redirect_res=redirectToLoginWithLastPage({request});
        return (await handleCookiesForLogout({session,request,next:redirect_res.next})).next;
    }
    var {next,terminate}=authenticateBySession({session,request,next});
    if(terminate)return next;
    var {next,terminate}= await authorizeBySession({session,request,next});
    return next;
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

interface MiddlewareResponse{
    next:NextResponse,
    terminate?:boolean
}


export function redirectToLoginWithLastPage({request}:{request:NextRequest}):MiddlewareResponse{
    const redirect_res=NextResponse.redirect(new URL('/login', request.url));
    redirect_res.cookies.set('last_page',request.nextUrl.pathname);
    redirect_res.headers.set('x-middleware-cache', 'no-cache') // Disables middleware caching
    return {next:redirect_res,terminate:true};
}

export function authenticateBySession({session,request,next}:PartialMiddlewareParams):MiddlewareResponse {
    if(session.user){
        return {next};
    }
    return redirectToLoginWithLastPage({request});
}

export async function authorizeBySession({session,request,next}:PartialMiddlewareParams):Promise<MiddlewareResponse>{
    const url=request.nextUrl.pathname;
    if(session.auth?.includes(url)){
        return {next};
    }
    const auth_response= await (await fetch(new URL('/api/authorize'+url,request.url),{headers:{Accept:'application/json'}}).then(res=>res)).json()
    const redirect_res=NextResponse.redirect(new URL('/authorize'+url, request.url));
    redirect_res.headers.set('x-middleware-cache', 'no-cache') // Disables middleware caching
    return {next:redirect_res,terminate:true};

}

export async function ensureHasLaravelSession({request,session,next}:PartialMiddlewareParams):Promise<MiddlewareResponse>{
    const laravel_session=request.cookies.get('laravel_session')?.value;
    if(!laravel_session){
        await session.destroy();
        return redirectToLoginWithLastPage({request})
    }
    return {next};
}

export async function handleCookiesForLogout({session,next}:PartialMiddlewareParams):Promise<MiddlewareResponse>{
    await session.destroy();
    next.cookies.delete('last_page');
    next.cookies.delete('laravel_session');
    return {next}
}
