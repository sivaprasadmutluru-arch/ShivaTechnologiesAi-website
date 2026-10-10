'use client';
import {useState} from 'react';
import {safeProfileImage} from '@/lib/profile-image';
export default function ProfileImage({name,src}:{name:string;src:string}){const [failed,setFailed]=useState(false);const initials=name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('');return <div className="person-avatar">{src&&safeProfileImage(src)&&!failed?<img src={src} alt={`${name} profile`} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<span className="person-initials" aria-hidden="true">{initials}</span>}</div>}
