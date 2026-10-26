// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{
 id:text('id').primaryKey().notNull(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),category:text('category').notNull(),message:text('message').notNull(),fingerprint:text('fingerprint').notNull(),created_at:integer('created_at').notNull(),consent_at:integer('consent_at').notNull(),status:text('status').notNull().default('new')
},table=>[index('enquiries_spam_idx').on(table.fingerprint,table.created_at)]);
export const contentItems=sqliteTable('content_items',{id:text('id').primaryKey().notNull(),kind:text('kind').notNull(),slug:text('slug').notNull(),title:text('title').notNull(),summary:text('summary').notNull(),body:text('body').notNull(),tags:text('tags').notNull(),state:text('state').notNull().default('draft'),revision:integer('revision').notNull().default(1),updated_at:integer('updated_at').notNull()},table=>[uniqueIndex('content_kind_slug_idx').on(table.kind,table.slug)]);

export const adminAccounts=sqliteTable('admin_accounts',{email:text('email').primaryKey().notNull(),active:integer('active').notNull().default(1),created_at:integer('created_at').notNull()});

export const adminCredentials=sqliteTable('admin_credentials',{email:text('email').primaryKey().notNull(),password_hash:text('password_hash').notNull(),role:text('role').notNull().default('admin'),active:integer('active').notNull().default(1),created_at:integer('created_at').notNull()});
export const adminSessions=sqliteTable('admin_sessions',{token_hash:text('token_hash').primaryKey().notNull(),email:text('email').notNull(),expires_at:integer('expires_at').notNull()},table=>[index('session_email_idx').on(table.email)]);
export const adminInvites=sqliteTable('admin_invites',{token_hash:text('token_hash').primaryKey().notNull(),email:text('email').notNull(),expires_at:integer('expires_at').notNull()});
export const authAttempts=sqliteTable('auth_attempts',{key:text('key').primaryKey().notNull(),count:integer('count').notNull(),expires_at:integer('expires_at').notNull()});
export const passwordResets=sqliteTable('password_resets',{token_hash:text('token_hash').primaryKey().notNull(),email:text('email').notNull(),expires_at:integer('expires_at').notNull()},table=>[index('password_reset_email_idx').on(table.email)]);
