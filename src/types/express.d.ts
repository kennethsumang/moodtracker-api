import { Request } from 'express';
import { CustomJwtPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}