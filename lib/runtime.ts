import {createRequire} from 'node:module';
import {mkdirSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
const require=createRequire(import.meta.url);
let database:any;
function db(){
 if(database)return database;
 const {DatabaseSync}=require('node:sqlite');
 const file=process.env.DATABASE_PATH||'/data/accrue.sqlite';mkdirSync(path.dirname(file),{recursive:true});
 database=new DatabaseSync(file);database.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY);');
 for(const name of readdirSync(path.join(process.cwd(),'drizzle')).filter(x=>x.endsWith('.sql')).sort()){
  if(database.prepare('SELECT name FROM schema_migrations WHERE name=?').get(name))continue;
  database.exec('BEGIN');try{database.exec(readFileSync(path.join(process.cwd(),'drizzle',name),'utf8').replaceAll('--> statement-breakpoint',''));database.prepare('INSERT INTO schema_migrations(name) VALUES(?)').run(name);database.exec('COMMIT');}catch(e){database.exec('ROLLBACK');throw e;}
 }return database;
}
class Statement {
 constructor(private sql:string,private args:any[]=[]){ }
 bind(...args:any[]){return new Statement(this.sql,args);}
 async first<T>():Promise<T|null>{return db().prepare(this.sql).get(...this.args)||null;}
 async all<T>():Promise<{results:T[]}>{return {results:db().prepare(this.sql).all(...this.args)};}
 run(){const r=db().prepare(this.sql).run(...this.args);return {meta:{changes:Number(r.changes)}};}
}
const DB={prepare:(sql:string)=>new Statement(sql),async batch(statements:Statement[]){const d=db();d.exec('BEGIN');try{const results=[];for(const s of statements)results.push(s.run());d.exec('COMMIT');return results;}catch(e){d.exec('ROLLBACK');throw e;}}};
export const env={DB,ADMIN_EMAIL:process.env.ADMIN_EMAIL,ADMIN_SETUP_TOKEN:process.env.ADMIN_SETUP_TOKEN,MAIL_SERVICE_URL:process.env.MAIL_SERVICE_URL,MAIL_SERVICE_KEY:process.env.MAIL_SERVICE_KEY,PUBLIC_SITE_URL:process.env.PUBLIC_SITE_URL};
