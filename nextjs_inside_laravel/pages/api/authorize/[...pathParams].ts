import { serverAuthorize } from '@/hooks/server_auth';
import { ironOptions } from '@/lib/iron_config';
import { ParamsWithPath } from '@/types/auth';
import { withIronSessionApiRoute } from 'iron-session/next';

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' });
//   }
export default withIronSessionApiRoute(
    async function handler(req,res){
        const {pathParams}=req.query as ParamsWithPath;
        const path='/'+(Array.isArray(pathParams)?pathParams:[pathParams]).join('/');
        if(process.env.BUILDTIME){return {ok:true}};
        const session=req.session;
        const laravel_session=req.cookies.laravel_session;
        if(!laravel_session){
            session.destroy();
        }
        res.status(200).json(await serverAuthorize({request:req,session,pathParams}))
    },ironOptions
)
