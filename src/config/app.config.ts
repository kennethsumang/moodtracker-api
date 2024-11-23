import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
};

export default config;