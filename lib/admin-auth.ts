import {env} from '@/lib/runtime';
import {cookies} from 'next/headers';
import {cookieName,digest} from './password-auth';
export type AdminUser={email:string;role:string};
export async function adminIdentity():Promise<AdminUser|null>{const raw=(await cookies()).get(cookieName)?.value;if(!raw||!/^([a-f0-9]{64})$/.test(raw))return null;return env.DB.prepare('SELECT c.email,c.role FROM admin_sessions s JOIN admin_credentials c ON c.email=s.email WHERE s.token_hash=? AND s.expires_at>? AND c.active=1').bind(await digest(raw),Date.now()).first<AdminUser>();}
export async function ownerIdentity(){const user=await adminIdentity();return user?.role==='owner'?user:null;}
export function sameOrigin(request:Request){const configured=env.PUBLIC_SITE_URL;const expected=configured?new URL(configured):new URL(request.url);return request.headers.get('origin')===expected.origin && request.headers.get('host')===expected.host;}
export function apiJson(value:unknown,status=200){return Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
