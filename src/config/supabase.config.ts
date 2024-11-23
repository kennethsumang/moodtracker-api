import dotenv from 'dotenv';

dotenv.config();

interface SupabaseConfig {
  url: string;
  key: string;
}

const config: SupabaseConfig = {
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_KEY || '',
};

export default config;