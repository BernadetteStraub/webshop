import { z } from 'zod';
import {AddressRequestSchema} from "./user-request";

export const UserUpdate = z.object({
    id: z.number().optional().nullable(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    email: z.string().email(),
    password: z.string().optional().nullable(),
    addresses: z.array(AddressRequestSchema),
});

export type UserUpdate = z.infer<typeof UserUpdate>;
