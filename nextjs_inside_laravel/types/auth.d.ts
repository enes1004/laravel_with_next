import { IncomingMessage } from "http";
import { IronSession } from "iron-session";
import { Url } from "url";
import { NextRequest } from "next/server";
import { ParsedUrlQuery } from "querystring";

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

interface ParamsWithPath{
    pathParams?: ParsedUrlQuery;
}

interface ServerAuthorizeParams extends ServerAuthParams , ParamsWithPath{}

interface AuthorizationFeedback{
    ok:boolean,
    reason?:string
}
interface MiddlewareAuthParams{
    request:NextRequest;
    session:IronSession
}
