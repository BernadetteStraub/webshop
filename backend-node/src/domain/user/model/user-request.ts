import { z } from 'zod';

export const AddressRequestSchema = z.object({
  id: z.number().optional().nullable(),
  street: z.string(),
  line2: z.string().optional().nullable(),
  country: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});
export const UserRequest = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string(),
  dateOfBirth: z.date().optional().nullable(),
  role: z.union([z.literal('USER'), z.literal('ADMIN')]).optional().nullable(),
  type: z.union([z.literal('LOCAL'), z.literal('REMOTE')]).optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  addresses: z.array(AddressRequestSchema),
});

export type UserRequest = z.infer<typeof UserRequest>;
export type AddressRequest = z.infer<typeof AddressRequestSchema>;
