import {env} from '@/lib/runtime';
import {defaults,type ContentItem,type Kind} from './default-content';
export async function listContent(kind:Kind,published=false):Promise<ContentItem[]>{
 const records=await env.DB.prepare('SELECT * FROM content_items WHERE kind=? ORDER BY updated_at DESC').bind(kind).all<ContentItem>();
 const merged=new Map(defaults.filter(x=>x.kind===kind).map(x=>[x.id,x]));
 for(const item of records.results)merged.set(item.id,item);
 return [...merged.values()].filter(x=>published?x.state==='published':true);
}
export async function findContent(kind:Kind,slug:string){return (await listContent(kind,true)).find(x=>x.slug===slug);}
