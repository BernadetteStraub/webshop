import express from 'express';
import * as userHandler from './user-handler';
import validationMiddleware from '../../middleware/validation';
import { UserRequest } from './model/user-request';
import {UserUpdate} from "./model/user-update";

const router = express.Router();

router.get('/', userHandler.getAll);
router.get('/:id', userHandler.getById);
router.put('/:id', validationMiddleware(UserUpdate), userHandler.update);
router.post('/login', userHandler.login);
router.post('/register', validationMiddleware(UserRequest), userHandler.register);

export default router;
