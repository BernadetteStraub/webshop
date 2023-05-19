import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  logger.info(`Incoming request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`Outgoing response: ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export default requestLoggerMiddleware;
