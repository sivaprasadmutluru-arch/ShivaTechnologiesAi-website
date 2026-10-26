# Accrue Technologies VPS deployment

Domain: https://accruetechnologies.com
Server: 187.127.153.232
Deployment directory: /opt/accrue-technologies
Compose project: accrue-technologies
Website private binding: 127.0.0.1:4183
Database volume: accrue-technologies_accrue_data

GoDaddy DNS records required:
A @ -> 187.127.153.232 (replace the parking A records)
CNAME www -> accruetechnologies.com

The application must remain behind the HTTPS reverse proxy. Set PUBLIC_SITE_URL and MAIL_SITE_ORIGIN to https://accruetechnologies.com. Secrets belong in the private server .env and are excluded from this source archive. The current Gmail sender remains shivatechnologiesai@gmail.com; domain registration alone does not create a new email mailbox.

Run docker compose up -d --build from the deployment directory. Do not use down -v unless permanently deleting the Accrue database. Purchoose runs in a separate Compose project and must not be changed or stopped by Accrue deployments.
