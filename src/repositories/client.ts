import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import config from '../config/db.config';

const sql = postgres(
  `postgres://${config.user}:${config.password}@${config.host}/${config.db}`
);

export const db = drizzle(sql);
