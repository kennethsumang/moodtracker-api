import * as dotenv from 'dotenv';

dotenv.config();

export interface DbConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  db: string;
}

const config: DbConfig = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  db: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
};

export default config;
