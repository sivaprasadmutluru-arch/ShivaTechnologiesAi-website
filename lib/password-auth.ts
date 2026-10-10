import {env} from 'cloudflare:workers';
import bcrypt from 'bcryptjs';
export const cookieName='shiva_admin';
export const normalEmail=(value:unknown)=>typeof value==='string'?value.trim().toLowerCase():'';
export const validEmail=(email:string)=>email.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validPassword=(value:unknown):value is string=>typeof value==='string'&&value.length>=12&&new TextEncoder().encode(value).length<=72;
export const token=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');}
export async function hashPassword(password:string){return bcrypt.hash(password,12);}
export async function verifyPassword(password:string,hash:string){return bcrypt.compare(password,hash);}
export function cookie(request:Request,value:string,age=28800){return `${cookieName}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${new URL(request.url).protocol==='https:'?'; Secure':''}`;}
export async function rateLimit(request:Request,email:string){const now=Date.now(),window=Math.floor(now/900000);const ip=request.headers.get('CF-Connecting-IP')||'local';for(const [subject,max] of [[`ip:${ip}`,30],[`email:${email}`,10]] as const){const key=await digest(`${window}:${subject}`);await env.DB.prepare('INSERT INTO auth_attempts (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').bind(key,now+900000).run();const row=await env.DB.prepare('SELECT count FROM auth_attempts WHERE key=?').bind(key).first<{count:number}>();if((row?.count||0)>max)return false;}await env.DB.prepare('DELETE FROM auth_attempts WHERE key IN (SELECT key FROM auth_attempts WHERE expires_at<? LIMIT 100)').bind(now).run();return true;}
export async function readJson(request:Request){if(!request.headers.get('content-type')?.startsWith('application/json'))throw Error('Invalid request.');const text=await request.text();if(text.length>4000)throw Error('Request too large.');const value=JSON.parse(text);if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid request.');return value;}
