CREATE TABLE `password_resets` (
  `token_hash` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `password_reset_email_idx` ON `password_resets` (`email`);
