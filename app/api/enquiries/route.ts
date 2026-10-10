import {env} from 'cloudflare:workers';
import {submitEnquiry} from '@/lib/contact.mjs';
export const dynamic='force-dynamic';
export async function POST(request:Request){return submitEnquiry(request,env);}
