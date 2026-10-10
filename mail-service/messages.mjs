const email = value => typeof value === 'string' && value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
const text = (value, max) => typeof value === 'string' && value.length > 0 && value.length <= max && !value.includes('\0');
export function messages(event, config) {
  if (!email(event.email)) throw Error('Invalid recipient');
  const from = {name:'Shiva Technologies AI', address:config.SMTP_USER};
  const signature = '\n\nShiva Technologies AI\n+91 9381934911';
  if (event.type === 'enquiry') {
    if (!text(event.name,100) || !/^SHV-[A-F0-9]{8}$/.test(event.reference) || !text(event.category,80) || !text(event.message,3000)) throw Error('Invalid enquiry');
    return [
      {from,to:event.email,subject:`We received your enquiry · ${event.reference}`,text:`Hello ${event.name},\n\nThank you for contacting Shiva Technologies AI. We have received your ${event.category.toLowerCase()} request. Our team will review it and follow up using your contact details.\n\nReference: ${event.reference}\nPlease keep this reference for future correspondence.${signature}`},
      {from,to:config.MAIL_NOTIFY_TO || config.SMTP_USER,replyTo:event.email,subject:`New website enquiry · ${event.reference}`,text:`Reference: ${event.reference}\nName: ${event.name}\nEmail: ${event.email}\nPhone: ${event.phone || 'Not provided'}\nCategory: ${event.category}\n\n${event.message}${signature}`},
    ];
  }
  if (event.type === 'invitation') {
    const url = new URL(event.url);
    const fragment = new URLSearchParams(url.hash.slice(1));
    if (url.origin !== config.MAIL_SITE_ORIGIN || url.pathname !== '/admin/setup/' || !/^[a-f0-9]{64}$/.test(fragment.get('token') || '') || fragment.get('email') !== event.email) throw Error('Invalid invitation');
    return [{from,to:event.email,subject:'Your Shiva Technologies AI administrator invitation',text:`You have been invited to manage the Shiva Technologies AI website.\n\nOpen this private link to choose your password:\n${url.href}\n\nThis invitation expires in 24 hours and can be used once. Do not forward it. If you did not expect this invitation, ignore this email.${signature}`}];
  }
  throw Error('Unsupported email event');
}
