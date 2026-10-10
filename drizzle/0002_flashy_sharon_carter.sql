CREATE TABLE `admin_accounts` (
	`email` text PRIMARY KEY NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL
);
