import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import logger from '../utils/logger';

const validationMiddleware = (schema: ZodSchema<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Parsing' + JSON.stringify(req.body));
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};

export default validationMiddleware;
