declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    ADMIN_EMAIL?: string;
    ADMIN_SETUP_TOKEN?: string;
    MAIL_SERVICE_URL?: string;
    MAIL_SERVICE_KEY?: string;
    PUBLIC_SITE_URL?: string;
    BUCKET?: R2Bucket;
  }
}
