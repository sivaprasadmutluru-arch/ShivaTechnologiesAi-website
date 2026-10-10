'use client';
import {useState} from 'react';
export default function SignOut(){const [busy,setBusy]=useState(false),[error,setError]=useState('');async function logout(){setBusy(true);try{const r=await fetch('/api/auth/logout',{method:'POST'});if(!r.ok)throw Error('Unable to sign out. Try again.');window.location.assign('/admin/login/')}catch(e){setError(e instanceof Error?e.message:'Unable to sign out');setBusy(false)}}return <><button type="button" disabled={busy} onClick={logout}>{busy?'Signing out…':'Sign out ↗'}</button>{error&&<p role="alert">{error}</p>}</>}
