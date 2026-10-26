import {redirect} from 'next/navigation';
import {ownerIdentity} from '@/lib/admin-auth';
import AdminAccounts from '@/components/AdminAccounts';
export const dynamic='force-dynamic';
export const metadata={title:'Admin accounts | Accrue Technologies',robots:{index:false,follow:false}};
export default async function Page(){if(!await ownerIdentity())redirect('/admin/login/');return <AdminAccounts/>;}
