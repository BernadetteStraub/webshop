import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';


export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.stack);
  res.status(500).json({ message: error.message });
  next();
};
