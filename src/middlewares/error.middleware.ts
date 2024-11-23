import { Request, Response } from 'express';
import ApiError from '../exceptions/api.error';
import { NextFunction } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${message}`);
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
      timestamp: dayjs.utc().toISOString(),
    }
  });
};

export default errorMiddleware;
