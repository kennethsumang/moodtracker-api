import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      res.status(res.statusCode || 200).json({
        data: result || null, // Controllers return data as `result`
      });
    } catch (error) {
      next(error); // Pass error to middleware
    }
  };
};

export default asyncHandler;