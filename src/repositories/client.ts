import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = postgres(
  `postgres://${process.env.DB_USER || ''}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || ''}/${process.env.DB_NAME || ''}`
);

export const db = drizzle(sql);
