import PasswordResetConfirm from '@/components/PasswordResetConfirm';
export const dynamic='force-dynamic';
export const metadata={title:'Reset password | Accrue Technologies',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Page(){return <section className="admin-login-shell"><div className="admin-login-card"><p className="eyebrow">ACCRUE TECHNOLOGIES · OWNER ACCESS</p><h1>Choose a new<br/><em>password.</em></h1><p className="login-intro">Use the private link sent to your email.</p><PasswordResetConfirm/><a className="login-secondary" href="/admin/login/">← Back to sign in</a></div></section>}
