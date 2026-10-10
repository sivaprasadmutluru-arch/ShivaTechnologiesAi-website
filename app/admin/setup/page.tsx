import {env} from 'cloudflare:workers';
import PasswordSetup from '@/components/PasswordSetup';
export const dynamic='force-dynamic';
export const metadata={title:'Set password | Shiva Technologies AI',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <section className="admin-login-shell"><div className="admin-login-card"><p className="eyebrow">PRIVATE ACCOUNT SETUP</p><h1>Your account.<br/><em>Your access.</em></h1><p>Set your password to access the admin panel.</p><PasswordSetup owner={env.ADMIN_EMAIL||''}/><a className="login-secondary" href="/admin/login/">← Back to sign in</a></div></section>}
