import * as dotenv from 'dotenv';

dotenv.config();

export interface JwtConfig {
  jwtSecret: string;
}

const config: JwtConfig = {
  jwtSecret: process.env.JWT_SECRET || '',
};

export default config;
