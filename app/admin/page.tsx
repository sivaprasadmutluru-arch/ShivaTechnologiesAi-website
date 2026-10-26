import {redirect} from 'next/navigation';
import {adminIdentity} from '@/lib/admin-auth';
import AdminDashboard from '@/components/AdminDashboard';
export const dynamic='force-dynamic';
export const metadata={title:'Admin | Accrue Technologies',robots:{index:false,follow:false}};
export default async function Page(){const user=await adminIdentity();if(!user)redirect('/admin/login/');return <>{user.role==='owner'&&<div className="section" style={{paddingBottom:0,paddingTop:25}}><a className="button" href="/admin/accounts/">Manage admin accounts →</a></div>}<AdminDashboard email={user.email}/></>;}
