import {env} from '@/lib/runtime';
import {apiJson,sameOrigin} from '@/lib/admin-auth';
import {normalEmail,validEmail,validPassword,hashPassword,digest,readJson,rateLimit} from '@/lib/password-auth';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 if(!sameOrigin(request))return apiJson({error:'Submit from this website.'},403);
 let data;try{data=await readJson(request)}catch{return apiJson({error:'Invalid reset request.'},400)}
 const email=normalEmail(data.email),raw=typeof data.token==='string'?data.token:'';
 if(!validEmail(email)||!validPassword(data.password)||!/^([a-f0-9]{64})$/.test(raw))return apiJson({error:'Enter a valid new password and use the link from your email.'},400);
 if(!await rateLimit(request,email))return apiJson({error:'Too many attempts. Try again in 15 minutes.'},429);
 const tokenHash=await digest(raw),now=Date.now();
 const updated=await env.DB.batch([
  env.DB.prepare('UPDATE admin_credentials SET password_hash=? WHERE email=? AND active=1 AND EXISTS (SELECT 1 FROM password_resets WHERE token_hash=? AND email=? AND expires_at>?)').bind(await hashPassword(data.password),email,tokenHash,email,now),
  env.DB.prepare('DELETE FROM password_resets WHERE token_hash=?').bind(tokenHash),
  env.DB.prepare('DELETE FROM admin_sessions WHERE email=?').bind(email),
 ]);
 if(!updated[0].meta.changes)return apiJson({error:'This reset link is invalid or has expired. Request a new one.'},403);
 return apiJson({ok:true});
}
