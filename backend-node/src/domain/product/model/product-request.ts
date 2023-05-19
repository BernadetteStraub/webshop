import { z } from 'zod';

export const ProductRequestSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    sizes: z.array(z.number()),
    images: z.array(z.string()),
    gender: z.string(),
});

export type ProductRequest = z.infer<typeof ProductRequestSchema>;
