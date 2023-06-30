import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const whitelist = ['/login', '/register', '/product', '/product/[0-9]+'];

// Middleware to check if the user is authenticated
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (whitelist.some(uri => req.url.includes(uri))) {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
