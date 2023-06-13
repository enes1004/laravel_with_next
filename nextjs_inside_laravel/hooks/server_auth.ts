import {AuthorizationFeedback, ServerAuthParams, ServerAuthorizeParams} from '@/types/auth';

const api_path=process.env.NEXT_PUBLIC_BACKEND_URL;

export const serverAuthenticate = async ({request,session }:ServerAuthParams) => {

    // const laravel_session=request.cookies.get('laravel_session')?.value;
    const laravel_session=request.cookies?.laravel_session;
    if(!laravel_session){await session.destroy();return false;}
    const res = await fetch(api_path+'/api/user',
        {
        credentials: "include",
        keepalive: false,
        headers:{
            // 'X-XSRF-TOKEN':await csrf,
           'Accept':'application/json',
           Cookie: (laravel_session? (`laravel_session=${laravel_session};`) : ''),
           referer: request.headers?.referer ?? 'http://localhost:3000',
        }
        }
         )
         .then(res=>{return res;})
             
    const user=await res.json()

    if(res.ok && user){
        session.user=user;
    }else{
        session.user=null;
    }
    await session.save();   
}

export async function  serverAuthorize({request,session,pathParams }:ServerAuthorizeParams):Promise<AuthorizationFeedback> {

    // const laravel_session=request.cookies.get('laravel_session')?.value;
    const path='/'+(Array.isArray(pathParams)?pathParams:[pathParams]).join('/');
    if(session?.auth?.includes(path)){
       return {ok:true};
    }
    const laravel_session=request.cookies?.laravel_session;
    const res = await fetch(api_path+'/api/auth'+path,
        {
        credentials: "include",
        keepalive: false,
        headers:{
            // 'X-XSRF-TOKEN':await csrf,
           'Accept':'application/json',
           Cookie: (laravel_session? (`laravel_session=${laravel_session};`) : ''),
           referer: request.headers?.referer ?? 'http://localhost:3000',
        }
        }
         )
         .then(res=>{return res;})
             
    const auth_response=await res.json()

    if(auth_response.ok){
        if(!session.auth){session.auth=[];}
        session.auth.push(path);
        await session.save();   
    }
    return auth_response;
}