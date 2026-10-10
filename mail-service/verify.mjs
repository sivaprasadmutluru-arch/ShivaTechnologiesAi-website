import nodemailer from 'nodemailer';
const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:587,secure:false,requireTLS:true,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:10000});
try {await transport.verify();console.log('Gmail SMTP authentication verified');} catch(error) {console.log('Gmail SMTP verification failed: '+(error.code||'UNKNOWN'));process.exitCode=1;} finally {transport.close();}
