import { NextFunction, Request, Response } from 'express';
import { ZodSchema, z } from 'zod';
import validationMiddleware from "./validation";
import logger from '../utils/logger';

jest.mock('../utils/logger', () => ({
    info: jest.fn(),
}));

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('validationMiddleware', () => {
    it('should call next function if request body is valid', () => {
        const req = {
            body: { name: 'test' },
        } as Request;

        const res = mockResponse();
        const next = jest.fn() as NextFunction;

        const schema: ZodSchema<unknown> = z.object({ name: z.string() });

        validationMiddleware(schema)(req, res, next);

        expect(logger.info).toBeCalledWith('Parsing' + JSON.stringify(req.body));
        expect(next).toBeCalled();
        expect(res.status).not.toBeCalled();
        expect(res.json).not.toBeCalled();
    });

    it('should return 400 if request body is invalid', () => {
        const req = {
            body: { name: 123 },
        } as Request;

        const res = mockResponse();
        const next = jest.fn() as NextFunction;

        const schema: ZodSchema<unknown> = z.object({ name: z.string() });

        validationMiddleware(schema)(req, res, next);

        expect(logger.info).toBeCalledWith('Parsing' + JSON.stringify(req.body));
        expect(next).not.toBeCalled();
        expect(res.status).toBeCalledWith(400);
    });
});