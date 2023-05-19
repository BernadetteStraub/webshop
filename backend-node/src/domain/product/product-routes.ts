import express from 'express';
import {create, getAll, getById} from './product-handler';
import validationMiddleware from "../../middleware/validation";
import {ProductRequestSchema} from "./model/product-request";

const router = express.Router();

router.post('/',validationMiddleware(ProductRequestSchema), create);
router.get('/:id', getById);
router.get('/', getAll);
export default router;