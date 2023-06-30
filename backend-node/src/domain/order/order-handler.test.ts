import { Request, Response } from 'express';
import { getOrderById } from './order-repository'; // Assuming order-service is the module where getOrderById is defined
import { getById } from './order-handler'; // Assuming order-controller is the module where getById is defined

jest.mock('./order-repository'); // Mock the module where getOrderById is defined

describe('Order Controller - getById', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockReq = {
            params: {
                id: '1',
            },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should respond with 200 and the order data if order is found', async () => {
        const mockOrder = { id: 1, items: [] };

        (getOrderById as jest.MockedFunction<typeof getOrderById>).mockResolvedValueOnce(
            mockOrder
        );

        await getById(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should respond with 404 if order is not found', async () => {
        (getOrderById as jest.MockedFunction<typeof getOrderById>).mockResolvedValueOnce(
            null
        );

        await getById(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should respond with 500 if there is an error', async () => {
        const errorMessage = 'Something went wrong';
        (getOrderById as jest.MockedFunction<typeof getOrderById>).mockImplementationOnce(
            () => {
                throw new Error(errorMessage);
            }
        );

        await getById(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});