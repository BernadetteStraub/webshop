import { PrismaClient } from '@prisma/client';
import { OrderResponseSchema, OrderResponse } from './model/order-response';
import {OrderRequest} from "./model/order-request";

const prisma = new PrismaClient();

export const createOrder = async (order: OrderRequest): Promise<OrderResponse> => {
    console.log("got here");
    const createdOrder = await prisma.order.create({
        data: {
            user: { connect: { id: order.userId } },
            orderItems: {
                create: order.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    size: item.size,
                })),
            }
        },
        include: {
            orderItems: true,
        },
    });

    return OrderResponseSchema.parse({
        ...createdOrder,
        items: createdOrder.orderItems,
    });
};

export const getAllOrdersByUserId = async (userId: number): Promise<OrderResponse[]> => {
    const orders = await prisma.order.findMany({
        where: {
            userId: userId,
        },
        include: {
            orderItems: true,
        },
    });

    return orders.map((order) => OrderResponseSchema.parse({...order, items: order.orderItems}));
};

export const getOrderById = async (id: number): Promise<OrderResponse | undefined> => {
    const order = await prisma.order.findUnique({
        where: {
            id: id,
        },
        include: {
            orderItems: true,
        },
    });

    if (order) {
        return OrderResponseSchema.parse(order);
    }
};