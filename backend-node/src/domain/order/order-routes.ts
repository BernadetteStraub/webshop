import express from 'express';
import validationMiddleware from "../../middleware/validation";
import {OrderRequestSchema} from "./model/order-request";
import {create, getAllForUser, getById} from "./order-handler";

const router = express.Router();

router.post('/',validationMiddleware(OrderRequestSchema), create);
router.get('/:id', getById);
router.get('/user/:userId', getAllForUser);
export default router;