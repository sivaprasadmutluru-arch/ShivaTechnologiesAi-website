import {env} from '@/lib/runtime';
import {deliverEmail} from '@/lib/email.mjs';
import {apiJson,sameOrigin} from '@/lib/admin-auth';
import {normalEmail,validEmail,token,digest,readJson,rateLimit} from '@/lib/password-auth';
export const dynamic='force-dynamic';
const response=()=>apiJson({ok:true,message:'If that account can sign in, a reset link has been sent.'});
export async function POST(request:Request){
 if(!sameOrigin(request))return apiJson({error:'Submit from this website.'},403);
 let data;try{data=await readJson(request)}catch{return response()}
 const email=normalEmail(data.email);if(!validEmail(email)||!await rateLimit(request,email))return response();
 const account=await env.DB.prepare('SELECT email FROM admin_credentials WHERE email=? AND active=1').bind(email).first<{email:string}>();
 if(!account)return response();
 const raw=token(),expiresAt=Date.now()+1800000;
 await env.DB.batch([env.DB.prepare('DELETE FROM password_resets WHERE email=?').bind(email),env.DB.prepare('INSERT INTO password_resets (token_hash,email,expires_at) VALUES (?,?,?)').bind(await digest(raw),email,expiresAt)]);
 const origin=env.PUBLIC_SITE_URL||new URL(request.url).origin;
 const url=new URL('/admin/reset/#token='+raw+'&email='+encodeURIComponent(email),origin).href;
 await deliverEmail(env,{type:'password_reset',email,url});
 return response();
}
