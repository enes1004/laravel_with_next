import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextRequest } from 'next/server';
import { Url } from 'url';
import { IncomingMessage } from 'http';
import { IronSessionData,IronSession } from 'iron-session';
interface AuthParams{
    middleware?:string|false;
    redirectIfAuthenticated?:Url|-1;
}

interface ServerAuthParams{
    request:IncomingMessage & {
        cookies: Partial<{
            [key: string]: string;
        }>
    }
    session:IronSession
}

interface MiddlewareAuthParams{
    request:NextRequest;
    session:IronSession
}


const api_path=process.env.NEXT_PUBLIC_BACKEND_URL;

export const serverAuth = async ({request,session }:ServerAuthParams) => {

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

export const useAuth = ({ middleware, redirectIfAuthenticated }:AuthParams = {}) => {
    const router = useRouter()

    const handleRedirectIfAuthenticated = ()=>{
        // if(redirectIfAuthenticated){
        // router.push(redirectIfAuthenticated??'')
        // }
        router.reload();
    }

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }:{setErrors:any}) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }:{setErrors:Function,setStatus:Function}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }:{setErrors:Function,setStatus:Function,email:string}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }:{setErrors:Function,setStatus:Function}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }:{setStatus:Function}) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        window.location.pathname= '/logout';
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            handleRedirectIfAuthenticated()
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
             handleRedirectIfAuthenticated()
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
