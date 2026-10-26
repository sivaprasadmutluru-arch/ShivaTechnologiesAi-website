import {ProjectsPreview} from '@/components/ContentViews';
import {listContent} from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata={title:"Projects | Accrue Technologies"};
export default async function Page(){const items=await listContent('project',true);return (<><section className="page-hero section"><p className="eyebrow">SELECTED EXPERIENCE</p><h1>Different challenges.<br /><em>The same engineering care.</em></h1><p>Explore our previous work in mobility and human resource management.</p></section><ProjectsPreview items={items} full /><section className="section page-cta"><h2>Let’s turn your next idea<br />into something useful.</h2><a className="button" href="/contact/">Discuss your project</a></section></>);}
