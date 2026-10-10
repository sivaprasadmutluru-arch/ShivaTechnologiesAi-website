import {findContent} from '@/lib/content';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=await findContent('project',slug);return {title:item?`${item.title} | Shiva Technologies AI`:'Project not found'};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=await findContent('project',slug);if(!item)notFound();return <><section className="page-hero section"><a className="text-link" href="/projects/">← All projects</a><p className="eyebrow">{item.tags}</p><h1>{item.title}</h1><p>{item.summary}</p></section><section className="section"><h2>Project overview.</h2>{item.body.split('\n').filter(Boolean).map((line,i)=><p key={i}>{line}</p>)}<a className="button" href="/contact/">Discuss a similar project</a></section></>}
