import {z} from "zod";

export const AddressResponseSchema = z.object({
    id: z.number(),
    street: z.string(),
    line2: z.string().optional(),
    country: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
});
export const UserResponse = z.object({
    id: z.number(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    dateOfBirth: z.date().optional(),
    role: z.union([z.literal('USER'), z.literal('ADMIN')]).optional(),
    type: z.union([z.literal('LOCAL'), z.literal('REMOTE')]).optional(),
    photoUrl: z.string().optional(),
    addresses: z.array(AddressResponseSchema),
});

export type UserResponse = z.infer<typeof UserResponse>;
export type AddressResponse = z.infer<typeof AddressResponseSchema>;
