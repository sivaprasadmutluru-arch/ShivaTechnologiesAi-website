import {redirect} from 'next/navigation';
import {adminIdentity} from '@/lib/admin-auth';
import PasswordLogin from '@/components/PasswordLogin';
export const dynamic='force-dynamic';
export const metadata={title:'Admin sign in | Accrue Technologies',robots:{index:false,follow:false}};
export default async function Page(){if(await adminIdentity())redirect('/admin/');return <section className="admin-login-shell"><div className="admin-login-card"><p className="eyebrow">ACCRUE TECHNOLOGIES · OWNER ACCESS</p><h1>Welcome<br/><em>back.</em></h1><p className="login-intro">Sign in with your email and password to manage your website.</p><PasswordLogin/><a className="login-secondary" href="/">← Back to website</a></div></section>}
