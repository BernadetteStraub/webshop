import { z } from 'zod';

export const OrderItemRequestSchema = z.object({
    id: z.number().optional(),
    productId: z.number(),
    quantity: z.number(),
    size: z.number(),
});

export const OrderRequestSchema = z.object({
    id: z.number().optional(),
    userId: z.number(),
    items: z.array(OrderItemRequestSchema),
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;