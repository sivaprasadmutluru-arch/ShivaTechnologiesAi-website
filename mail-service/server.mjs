import http from 'node:http';
import {timingSafeEqual} from 'node:crypto';
import nodemailer from 'nodemailer';
import {messages} from './messages.mjs';
const config = process.env;
if (!config.SMTP_USER || !config.SMTP_PASSWORD || !config.MAIL_SERVICE_KEY || config.MAIL_SERVICE_KEY.length < 32 || !config.MAIL_SITE_ORIGIN) throw Error('Email service secrets are not configured');
const transport = nodemailer.createTransport({
  host:config.SMTP_HOST || 'smtp.gmail.com',port:Number(config.SMTP_PORT || 587),secure:false,requireTLS:true,
  auth:{user:config.SMTP_USER,pass:config.SMTP_PASSWORD.replace(/\s/g,'')},
  connectionTimeout:8000,greetingTimeout:8000,socketTimeout:10000,
  tls:{minVersion:'TLSv1.2'},
});
function reply(res, code, data) {res.writeHead(code, {'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
const server = http.createServer(async (req,res) => {
  if (req.url === '/health' && req.method === 'GET') return reply(res,200,{ready:true});
  if (req.url !== '/deliver' || req.method !== 'POST') return reply(res,404,{error:'Not found'});
  const actual = Buffer.from(req.headers.authorization || ''), expected = Buffer.from(`Bearer ${config.MAIL_SERVICE_KEY}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual,expected)) return reply(res,401,{error:'Unauthorised'});
  if (!req.headers['content-type']?.startsWith('application/json')) return reply(res,415,{error:'JSON required'});
  try {
    let body='';for await (const chunk of req) {body += chunk;if (Buffer.byteLength(body)>16000) return reply(res,413,{error:'Request too large'});}
    let outgoing;try {outgoing=messages(JSON.parse(body),config);} catch {return reply(res,400,{error:'Invalid email event'});}
    const outcomes=await Promise.allSettled(outgoing.map(mail=>transport.sendMail(mail)));
    const accepted=outcomes.map(x=>x.status === 'fulfilled' && x.value.accepted?.length > 0);
    // Never log messages, invitation tokens, SMTP errors or credentials.
    console.log(JSON.stringify({event:outgoing.length===2?'enquiry':'invitation',delivery:accepted.map(x=>x?'sent':'failed')}));
    return reply(res,200,{status:accepted.every(Boolean)?'sent':'failed',acknowledgement:accepted[0]?'sent':'failed'});
  } catch { return reply(res,500,{error:'Delivery unavailable'}); }
});
server.requestTimeout=30000;server.headersTimeout=10000;
server.listen(Number(config.MAIL_PORT || 4180),config.MAIL_BIND || '127.0.0.1',()=>console.log('Shiva email service ready'));
