import {Request, Response} from 'express';
import {UserRequest} from './model/user-request';
import * as userRepository from "./user-repository";
import {generateToken} from '../../utils/generate-token';
import {UserResponse} from "./model/user-response";

import {getUserById} from "./user-repository";
import logger from "../../utils/logger";


export const getAll = async (req: Request, res: Response<UserResponse[]>) => {
    const users = await userRepository.getAllUsers();
    return res.status(200).json(users);
};

export const getById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await getUserById(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userRequest: UserRequest = req.body;
        const user = await userRepository.updateUser(parseInt(id), userRequest);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const userResponse = await userRepository.loginUser(email, password);
        const token = generateToken(userResponse.id);
        res.status(200).json({user: userResponse, token});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
export const register = async (req: Request, res: Response) => {
    const userRequest: UserRequest = req.body;
    try {
        const userResponse = await userRepository.registerUser(userRequest);
        const token = generateToken(userResponse.id);
        res.status(201).json({
            user: userResponse,
            token,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

};
