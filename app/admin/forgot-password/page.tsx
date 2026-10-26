import PasswordResetRequest from '@/components/PasswordResetRequest';
export const dynamic='force-dynamic';
export const metadata={title:'Forgot password | Accrue Technologies',robots:{index:false,follow:false}};
export default function Page(){return <section className="admin-login-shell"><div className="admin-login-card"><p className="eyebrow">ACCRUE TECHNOLOGIES · OWNER ACCESS</p><h1>Reset your<br/><em>password.</em></h1><p className="login-intro">Enter your admin email and we will send a private reset link.</p><PasswordResetRequest/><a className="login-secondary" href="/admin/login/">← Back to sign in</a></div></section>}
