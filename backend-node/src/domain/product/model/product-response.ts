import { z } from 'zod';

export const ProductResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    sizes: z.array(z.number()),
    images: z.array(z.string()),
    gender: z.string(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
