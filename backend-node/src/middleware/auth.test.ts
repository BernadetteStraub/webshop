import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {authMiddleware} from './auth';
const JWT_SECRET = 'default_secret';

describe('authMiddleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            url: '/order',
            headers:{
                authorization: ''
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 401 if no token is provided', () => {
        authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.json).toBeCalledWith({ message: 'No token provided' });
    });

    it('should call next function if valid JWT is in the header', () => {
        const validToken = jwt.sign({ foo: 'bar' }, JWT_SECRET);

        mockRequest = {
            url: '/order',
            headers: {
                authorization: `Bearer ${validToken}`,
            },
        };

        authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
        expect(mockResponse.status).not.toBeCalled();
    });
});