import { SignJWT, jwtVerify, decodeJwt, importJWK } from 'jose';
import config from '../config/jwt.config';

/**
 * JWT Utility class to create, verify, and decode JSON Web Tokens (JWTs).
 */
export default class JwtLibrary {
  /**
   * Creates a JWT token with the given payload and expiration time.
   * @param payload - The payload to encode in the JWT.
   * @returns A promise that resolves to the signed JWT token as a string.
   */
  static async createNewToken(payload: object): Promise<string> {
    const secretKey = config.jwtSecret;
    const secret = await importJWK({ kty: 'oct', k: secretKey });
    const jwt = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(secret);
    return jwt;
  }

  /**
   * Verifies the given JWT token using the secret key.
   * @param token - The JWT token to verify.
   * @returns A promise that resolves to the decoded payload if verification is successful.
   * @throws An error if the token is invalid or expired.
   */
  static async verifyToken(token: string): Promise<object> {
    try {
      const secretKey = config.jwtSecret;
      const secret = await importJWK({ kty: 'oct', k: secretKey });
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Decodes the JWT without verification, useful for inspection purposes.
   * @param token - The JWT token to decode.
   * @returns The decoded payload and headers as an object.
   */
  static decodeJWT(token: string): object {
    return decodeJwt(token);
  }
}
