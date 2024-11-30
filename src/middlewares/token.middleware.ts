import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import BadRequestError from '../exceptions/badRequest.error';
import { verifyJwt } from '../utils/jwt.util';

dayjs.extend(utc);

const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    throw new BadRequestError('No token provided');
  }

  const bearerToken = authToken.split(' ');
  if (bearerToken.length < 2 || bearerToken[0] !== 'Bearer') {
    throw new BadRequestError('Invalid bea');
  }

  const token = bearerToken[1];
  req.user = await verifyJwt(token);
  console.log(req.user);
  next();
};

export default tokenMiddleware;
