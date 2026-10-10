export type Kind='project'|'service'|'career'|'person';
export type ContentItem={id:string;kind:Kind;slug:string;title:string;summary:string;body:string;tags:string;state:'draft'|'published'|'archived';revision:number;updated_at:number};
const make=(kind:Kind,slug:string,title:string,summary:string,body:string,tags:string):ContentItem=>({id:`${kind}-${slug}`,kind,slug,title,summary,body,tags,state:'published',revision:0,updated_at:0});
export const defaults:ContentItem[]=[
make('person','siva-prasad-m','Siva Prasad M','Developer','',''),
make('person','sidda-ramesh-reddy','Sidda Ramesh Reddy','DevOps Engineer','',''),
make('person','nagaraju-nidumolu','Nagaraju Nidumolu','Developer','',''),
make('person','fardheen-ahmad','Fardheen Ahmad','Developer','',''),
make('project','ride-sharing','Ride-sharing mobile applications','Connected experiences for riders and drivers.','Previous project experience building ride-sharing mobile applications.\nRider and driver experiences connect the trip journey across mobile platforms.\nTalk to us about your mobility product, integration needs and maintenance roadmap.','Mobile apps · React Native · Android · iOS'),
make('project','hrms','Human Resource Management System','Bring people and everyday HR workflows together.','Previous project experience delivering a Human Resource Management System.\nA connected application for managing employee information and HR workflows.\nDiscuss a system designed around your organisation and its operational needs.','HRMS · Web applications · Java · React'),
make('service','web','Web applications','Fast, intuitive experiences for your customers and teams.','React interfaces and Java backend development.\nResponsive design, connected APIs and application integration.\nTesting, deployment and ongoing improvements.','React · Java · Web'),
make('service','mobile','Mobile applications','Connected products for Android and iOS.','React Native cross-platform development.\nAndroid and iOS application engineering.\nRelease support, platform updates and ongoing maintenance.','React Native · Android · iOS'),
make('service','ai','AI integration','Put practical intelligence into everyday work.','Conversational assistants and knowledge search.\nImage and content generation workflows.\nPrototyping with human review, quality and cost considerations.','AI · Automation · Generative experiences'),
make('service','maintenance','Application maintenance','Keep your product healthy as your business evolves.','Application review and prioritised fixes.\nDependency upgrades and performance improvements.\nRelease planning and ongoing support.','Support · Upgrades · Performance'),
make('service','cloud-devops','Cloud & DevOps','Reliable delivery from development to production.','AWS application deployment, monitoring and backups.\nHostinger hosting, VPS, DNS and HTTPS configuration.\nCI/CD pipelines, staging environments and rollback planning.','AWS · Hostinger · CI/CD')];
