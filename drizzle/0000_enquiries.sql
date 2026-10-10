CREATE TABLE `enquiries` (
 `id` text PRIMARY KEY NOT NULL,
 `name` text NOT NULL,
 `email` text NOT NULL,
 `phone` text NOT NULL,
 `category` text NOT NULL,
 `message` text NOT NULL,
 `fingerprint` text NOT NULL,
 `created_at` integer NOT NULL,
 `consent_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_spam_idx` ON `enquiries` (`fingerprint`, `created_at`);
