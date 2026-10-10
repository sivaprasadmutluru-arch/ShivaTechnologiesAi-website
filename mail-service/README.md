# Gmail email delivery

This companion Node.js service follows the HRMS SMTP approach. It sends enquiry acknowledgements, owner notifications and administrator invitations through Gmail with required STARTTLS on port 587. The website calls its authenticated HTTP endpoint because its Cloudflare runtime cannot run the HRMS Java mail service.

## Local

1. Run `npm ci` in this folder.
2. Copy `config.example` to `.env`. Set `SMTP_PASSWORD` to your Google app password and `MAIL_SERVICE_KEY` to a random secret of at least 32 characters. Keep `.env` private.
3. Run `npm start`. The default listener is `127.0.0.1:4180`.
4. Set `MAIL_SERVICE_URL="http://127.0.0.1:4180/deliver"` and the matching `MAIL_SERVICE_KEY` in the website's private `.dev.vars`, then restart the website.

## Production

Deploy this folder on a Node.js server with a process supervisor. Inject secrets through the hosting environment. Put the service behind HTTPS, configure its exact `MAIL_SITE_ORIGIN` and the website's `PUBLIC_SITE_URL` to the public website origin, and set matching `MAIL_SERVICE_URL` and `MAIL_SERVICE_KEY` secrets on the website. Do not expose port 4180 directly to the internet. For reverse proxy access, keep the service bound to loopback. Use a public production URL in invitation links; localhost links only work on the recipient's own computer.

SMTP acceptance does not guarantee inbox placement. Failures are reported without discarding enquiries or invitations. This version attempts delivery immediately; it has no background retry queue or email tracking. Provider logs and recipients' copies have separate retention from the website database. The service does not log email contents, passwords or invitation tokens.

The sender and notification inbox are `shivatechnologiesai@gmail.com`. A custom-domain sender needs a verified mailbox or alias.
