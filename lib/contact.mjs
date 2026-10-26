import {deliverEmail} from './email.mjs';
const categories=new Set(['Web application','Mobile application','Web & mobile platform','AI integration','Application maintenance','Cloud & DevOps','Career enquiry','Other enquiry']);
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function submitEnquiry(request,env){
 if(request.method!=='POST')return json({error:'Method not allowed.'},405);
 const origin=request.headers.get('Origin');if(!origin||origin!==new URL(env.PUBLIC_SITE_URL||request.url).origin||request.headers.get('host')!==new URL(env.PUBLIC_SITE_URL||request.url).host)return json({error:'Please submit from this website.'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Invalid request format.'},415);
 if(Number(request.headers.get('Content-Length')||0)>16000)return json({error:'Enquiry is too long.'},413);
 let data;try{const body=await request.text();if(body.length>16000)return json({error:'Enquiry is too long.'},413);data=JSON.parse(body)}catch{return json({error:'Invalid enquiry.'},400)}
 if(!data||typeof data!=='object'||Array.isArray(data))return json({error:'Invalid enquiry.'},400);
 const clean=(key,max)=>typeof data[key]==='string'&&data[key].trim().length<=max?data[key].trim():null;
 const name=clean('name',100),email=clean('email',254),phone=clean('phone',30)??'',message=clean('message',3000),type=clean('type',80);
 if(data.website)return json({error:'Unable to accept this enquiry.'},400);
 if(!name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!message||message.length<10||!categories.has(type)||data.consent!=='on')return json({error:'Please enter a name, valid email and message, and agree to the privacy information.'},400);
 if(phone&&!/^[+\d\s().-]{5,30}$/.test(phone))return json({error:'Please check your phone number.'},400);
 if(!env.DB)return json({error:'Enquiry storage is temporarily unavailable. Please contact us by phone or WhatsApp.'},503);
 const now=Date.now(),day=new Date(now).toISOString().slice(0,10),ip=request.headers.get('CF-Connecting-IP')||env.LOCAL_IP||'local';
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(day+'|'+ip));const fingerprint=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 const reference='SHV-'+crypto.randomUUID().slice(0,8).toUpperCase();
 try{
  const recent=await env.DB.prepare('SELECT count(*) AS count FROM enquiries WHERE fingerprint = ? AND created_at > ?').bind(fingerprint,now-600000).first();
  if(recent?.count>=5)return json({error:'Too many enquiries in a short time. Please wait a few minutes or contact us directly.'},429);
  await env.DB.prepare('DELETE FROM enquiries WHERE created_at < ?').bind(now-90*86400000).run();
  await env.DB.prepare('INSERT INTO enquiries (id, name, email, phone, category, message, fingerprint, created_at, consent_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(reference,name,email,phone,type,message,fingerprint,now,now).run();
  const emailDelivery=await deliverEmail(env,{type:'enquiry',reference,name,email,phone,category:type,message});
  return json({reference,emailDelivery},201);
 }catch{return json({error:'We could not save your enquiry. Please try again or contact us on WhatsApp.'},503)}
}
