import {UserRequest} from "./model/user-request";
import {UserResponse} from "./model/user-response";
import {PrismaClient} from "@prisma/client";
import {hashPassword} from "../../utils/hash-password";
import {intervalToDuration} from "date-fns";
import bcrypt from 'bcryptjs';
import logger from "../../utils/logger";
import {UserUpdate} from "./model/user-update";

const prisma = new PrismaClient();


export const getAllUsers = async (): Promise<UserResponse[]> => {
    const users = await prisma.user.findMany();
    return users.map(user => {
        return {
            ...user,
            id: user.id,
        }
    });
}

export const getUserById = async (id: number): Promise<UserResponse> => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
    });
    if (!user) throw new Error("User not found");
    const address = await prisma.address.findFirst({
        where: {
            userId: user.id
        }
    });
    return {
        ...user,
        addresses: [address],
        id: user.id,
    }
}

export const updateUser = async (id: number, userRequest: UserUpdate): Promise<UserResponse> => {
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            firstName: userRequest.firstName,
            lastName: userRequest.lastName,
            email: userRequest.email,
        }
    });
    if (userRequest.addresses.length > 0) {
        const address = userRequest.addresses[0];
        await prisma.address.update({
            where: {id: address.id},
            data: {...address},
        })
    }
    const user = await  getUserById(id);
    return user;
}

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
    const user = await prisma.user.findUnique({
        where: {email},
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Incorrect password');
    }
    const address = await prisma.address.findFirst({
        where: {
            userId: user.id
        }
    });

    return {
        ...user,
        addresses: [address],
        id: user.id,
    }
}
export const registerUser = async (userRequest: UserRequest): Promise<UserResponse> => {
    const hashedPassword = await hashPassword(userRequest.password);
    const age = userRequest.dateOfBirth ? intervalToDuration({
        start: userRequest.dateOfBirth,
        end: Date.now()
    }).years : undefined;
    const user = await prisma.user.create({
        data: {
            firstName: userRequest.firstName,
            lastName: userRequest.lastName,
            dateOfBirth: userRequest.dateOfBirth,
            role: userRequest.role,
            type: userRequest.type,
            email: userRequest.email,
            password: hashedPassword,
            age: age,
        },
    });
    const address = userRequest.addresses[0];
    const createdAddress = await prisma.address.create({
        data: {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    return {
        ...user,
        id: user.id,
        addresses: [createdAddress]
    }
}
