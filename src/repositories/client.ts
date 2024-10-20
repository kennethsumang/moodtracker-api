import { drizzle } from 'drizzle-orm/node-postgres';
import config from '../config/db.config';
import { Client } from 'pg';

const client = new Client({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.db,
});
await client.connect();
export const db = drizzle(client);
