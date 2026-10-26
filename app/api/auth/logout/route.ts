import {env} from '@/lib/runtime';
import {apiJson,sameOrigin} from '@/lib/admin-auth';
import {cookieName,cookie,digest} from '@/lib/password-auth';
export const dynamic='force-dynamic';
export async function POST(request:Request){if(!sameOrigin(request))return apiJson({error:'Submit from this website.'},403);const raw=(request.headers.get('cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);if(raw)await env.DB.prepare('DELETE FROM admin_sessions WHERE token_hash=?').bind(await digest(raw)).run();const response=apiJson({ok:true});response.headers.set('Set-Cookie',cookie(request,'',0));return response;}
