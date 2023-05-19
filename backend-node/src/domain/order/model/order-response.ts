import { z } from 'zod';

export const OrderItemResponseSchema = z.object({
    id: z.number(),
    productId: z.number(),
    quantity: z.number(),
    size: z.number(),
});

export const OrderResponseSchema = z.object({
    id: z.number(),
    userId: z.number(),
    items: z.array(OrderItemResponseSchema),
    createdAt: z.instanceof(Date),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;