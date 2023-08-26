import Layout from '@/app/_components/layout';
import { serverAuthorize } from '@/hooks/server_auth';
import { ironOptions } from '@/lib/iron_config';
import { withIronSessionSsr } from 'iron-session/next';
import Head from 'next/head';
import utilStyles from '@/styles/utils.module.css';
import { AuthorizationFeedback, ParamsWithPath } from '@/types/auth';
import { GetServerSidePropsContext } from 'next';

const Auth = ({auth_response}:{auth_response:AuthorizationFeedback}) => {
    return  (<Layout>
    <Head>
      <title>Blocked</title>
    </Head>
      <h2 className={utilStyles.h2}>You are blocked from viewing this page</h2>
      <br/>
      <div className={utilStyles.lightText}>Reason: {auth_response.reason}</div>
   </Layout>)
}



export const getServerSideProps =withIronSessionSsr(
    async function getServerSideProps({req,res,params}){
        const { pathParams }=params as ParamsWithPath;
        
        const path='/'+(Array.isArray(pathParams)?pathParams:[pathParams]).join('/');
        const redirection={
            redirect:{
                destination:path,
                permanent:false
            }
        };
        if(process.env.BUILDTIME){return redirection};
        const session=req.session;
        const laravel_session=req.cookies.laravel_session;
        if(!laravel_session){
            session.destroy();
        }
        const auth_response=await serverAuthorize({request:req,session,pathParams})
        if(auth_response?.ok){
            return redirection;
        }
        //// 
        return {
            props:{auth_response}
        }
    },ironOptions
)


export default Auth
