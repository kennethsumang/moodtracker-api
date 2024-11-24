import * as jose from "jose";
import jwtConfig from '../config/jwt.config';
import * as fs from 'node:fs';
import path from 'path'; // Assuming this script is in the root directory

const rootDirectory = process.cwd();

const signJwt = async (data: Record<string, unknown>) => {
  const filePath = path.join(rootDirectory, "privateKey.pem");
  const privateKey = fs.readFileSync(filePath, "utf-8");
  const key = await jose.importSPKI(privateKey, 'RS256');
  return new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime(jwtConfig.expiry)
    .setIssuer(jwtConfig.issuer)
    .setAudience(jwtConfig.audience)
    .sign(key);
}

const verifyJwt = async (token: string) => {
  const filePath = path.join(rootDirectory, "publicKey.pem");
  const publicKey = fs.readFileSync(filePath, "utf-8");
  const key = await jose.importSPKI(publicKey, 'RS256');
  const { payload, protectedHeader } = await jose.jwtVerify(token, key, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
  });
  return payload;
}

export { signJwt, verifyJwt };