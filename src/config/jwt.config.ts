interface JwtConfig {
  secret: string;
}

const config: JwtConfig = {
  secret: process.env.JWT_SECRET || '',
};

export default config;