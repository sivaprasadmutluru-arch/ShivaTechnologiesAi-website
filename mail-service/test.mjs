import test from 'node:test';
import assert from 'node:assert/strict';
import {messages} from './messages.mjs';
import {deliverEmail} from '../lib/email.mjs';
const config={SMTP_USER:'shivatechnologiesai@gmail.com',MAIL_SITE_ORIGIN:'https://example.com'};
test('enquiry acknowledgement and owner notice use fixed sender and safe subjects',()=>{
 const mail=messages({type:'enquiry',name:'Visitor',email:'visitor@example.com',phone:'12345',reference:'SHV-ABCD1234',category:'Application maintenance',message:'Please help us with our application.'},config);
 assert.equal(mail.length,2);assert.equal(mail[0].to,'visitor@example.com');assert.equal(mail[1].to,config.SMTP_USER);assert.equal(mail[1].replyTo,'visitor@example.com');assert.match(mail[0].text,/SHV-ABCD1234/);
});
test('invitations reject foreign origins and mismatched recipients',()=>{
 const base={type:'invitation',email:'member@example.com',url:`https://example.com/admin/setup/#token=${'a'.repeat(64)}&email=member%40example.com`};
 assert.equal(messages(base,config).length,1);
 assert.throws(()=>messages({...base,url:base.url.replace('example.com/admin','evil.com/admin')},config));
 assert.throws(()=>messages({...base,email:'other@example.com'},config));
 assert.throws(()=>messages({...base,email:'member@example.com\r\nBcc:bad@example.com'},config));
});
test('missing configuration and network failures never claim delivery',async()=>{
 assert.equal((await deliverEmail({},{})).status,'not_configured');
 const original=globalThis.fetch;try {globalThis.fetch=async()=>{throw Error('offline')};assert.equal((await deliverEmail({MAIL_SERVICE_URL:'http://127.0.0.1:4180/deliver',MAIL_SERVICE_KEY:'x'},{})).status,'failed');}finally{globalThis.fetch=original;}
});
test('SMTP acknowledgement failure is preserved despite accepted notification',async()=>{
 const original=globalThis.fetch;try {globalThis.fetch=async()=>Response.json({status:'failed',acknowledgement:'failed'});const result=await deliverEmail({MAIL_SERVICE_URL:'https://mail.example.com/deliver',MAIL_SERVICE_KEY:'x'},{});assert.equal(result.status,'failed');assert.equal(result.acknowledgement,'failed');}finally{globalThis.fetch=original;}
});
