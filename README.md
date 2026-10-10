# Shiva Technologies — AI Innovation Hub

React site using the Next.js App Router API through Vinext on Cloudflare Workers. D1 stores enquiries, editable content, team profiles and admin accounts.

## Run locally

Use Node 22.13 or newer. Install with npm run install:ci. Run npm run dev -- --port 4173. Build with npm run build.

## Email/password admin login

/admin/login/ requires email and password. Local test authentication and ChatGPT admin authentication are disabled. Passwords are hashed with bcrypt cost 12, sessions use random 256-bit tokens stored as hashes, and browser cookies are HttpOnly and SameSite=Lax (Secure on HTTPS). Sessions expire after 8 hours. Login attempts are limited. The owner can create private 24-hour member setup links at /admin/accounts/ and disable or restore member access. Disabling access invalidates sessions. Members cannot manage accounts. About Us team profiles are separate from login accounts.

## First owner setup

Set production ADMIN_EMAIL to sivaprasadmutluru@gmail.com. Generate an independent random 32-byte ADMIN_SETUP_TOKEN and store it as a secret in the hosting environment. Never commit that token or copy the local .dev.vars into production. Apply all Drizzle migrations in order. Visit /admin/setup/, enter the owner email, setup key, and your own password (at least 12 characters, maximum 72 UTF-8 bytes). Setup cannot replace an existing password. After setup, remove ADMIN_SETUP_TOKEN from the hosting environment. Production and localhost databases are separate: the production password must be set in production.

The local setup key is in ignored .dev.vars and has been prepared for the local setup screen. There is no default or preassigned password. Invitations are shared manually by the owner; no automatic email service or password recovery service is configured.

## Deployment

This runtime needs Cloudflare Workers and a D1 DB binding; it is not a static upload. Sites hosting applies migrations automatically when published. Other Cloudflare hosting must apply the SQL files in drizzle/ and supply the DB binding plus runtime environment values. Use HTTPS in production. The source ZIP excludes local secrets, databases and node_modules. The existing hosted site is not changed by this local update.

## Content and enquiries

Projects, services, careers and people support draft, published and archived states. Published edits appear when the website is refreshed. Enquiries are retained for 90 days and removed on subsequent submissions; expired enquiries are excluded from the dashboard and CSV export. CSV exports up to 10,000 recent records. No email notifications are configured.

## Automatic email
Enquiry submissions attempt an acknowledgement to the visitor and a team notification. Member invitations attempt an invitation email and retain the manual sharing link on failure. See mail-service/README.md for the companion Gmail SMTP service, private configuration and production deployment. Local SMTP configuration is excluded from the source ZIP. Gmail sender: shivatechnologiesai@gmail.com.

