CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."moods" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"datetime" timestamp NOT NULL,
	"level" integer DEFAULT 3,
	"content" text DEFAULT '',
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"timezone" text DEFAULT 'Asia/Manila' NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my_schema"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"emailVerifiedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."moods" ADD CONSTRAINT "moods_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "my_schema"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my_schema"."settings" ADD CONSTRAINT "settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "my_schema"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "my_schema"."users" USING btree (lower("email"));