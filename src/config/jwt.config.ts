interface JwtConfig {
  secret: string;
  issuer: string;
  audience: string;
  expiry: string;
}

const config: JwtConfig = {
  secret: process.env.JWT_SECRET || '',
  issuer: process.env.JWT_ISSUER || '',
  audience: process.env.JWT_AUDIENCE || '',
  expiry: process.env.JWT_EXPIRY || '2h',
};

export default config;