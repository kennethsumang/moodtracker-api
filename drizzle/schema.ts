import { relations, sql, SQL } from 'drizzle-orm';
import {
  text,
  pgSchema,
  timestamp,
  uuid,
  integer,
  uniqueIndex,
  AnyPgColumn,
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
  userId: text('userId').notNull(),
  level: integer('level').default(3),
  content: text('content').default(''),
  createdAt: timestamp('createdAt').notNull(),
});

export const usersRelations = relations(usersSchema, ({ many }) => ({
  moods: many(moodsSchema),
}));

export const moodsRelations = relations(moodsSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [moodsSchema.userId],
    references: [usersSchema.id],
  }),
}));
