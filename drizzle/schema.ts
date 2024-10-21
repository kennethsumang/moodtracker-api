import { sql, SQL } from 'drizzle-orm';
import {
  text,
  pgSchema,
  timestamp,
  uuid,
  integer,
  uniqueIndex,
  AnyPgColumn,
  serial,
  numeric,
} from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('my_schema');

export const usersSchema = mySchema.table(
  'users',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt').notNull(),
    emailVerifiedAt: timestamp('emailVerifiedAt'),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  })
);

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const moodsSchema = mySchema.table('moods', {
  id: uuid('id').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => usersSchema.id),
  datetime: timestamp('datetime').notNull(),
  level: integer('level').default(3),
  content: text('content').default(''),
  createdAt: timestamp('createdAt').notNull(),
});

export const settingsSchema = mySchema.table('settings', {
  id: serial('id').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => usersSchema.id),
  timezone: text('timezone').notNull().default('Asia/Manila'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt'),
});
