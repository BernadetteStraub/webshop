import { Request, Response } from 'express';
import {createOrder, getAllOrdersByUserId, getOrderById} from "./order-repository";
import {OrderRequest} from "./model/order-request";

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData: OrderRequest = req.body;
        const createdOrder = await createOrder(orderData);
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllForUser = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const orders = await getAllOrdersByUserId(userId);
    res.json(orders);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const order = await getOrderById(orderId);

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}