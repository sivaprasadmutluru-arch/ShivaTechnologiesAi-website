export async function deliverEmail(env, event) {
  if (!env.MAIL_SERVICE_URL || !env.MAIL_SERVICE_KEY) return {status:'not_configured'};
  try {
    const url = new URL(env.MAIL_SERVICE_URL);
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['127.0.0.1','localhost','email'].includes(url.hostname))) return {status:'failed'};
    const response = await fetch(url, {
      method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${env.MAIL_SERVICE_KEY}`},
      body:JSON.stringify(event), signal:AbortSignal.timeout(25000), redirect:'manual',
    });
    if (!response.ok) return {status:'failed'};
    const result = await response.json();
    return {status:result.status === 'sent' ? 'sent' : 'failed', acknowledgement:result.acknowledgement === 'sent' ? 'sent' : 'failed'};
  } catch { return {status:'failed'}; }
}
