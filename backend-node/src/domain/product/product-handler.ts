import {Request, RequestHandler, Response} from 'express';
import {createProduct, getAllProducts, getProductById} from "./product-repository";
import {ProductRequest} from "./model/product-request";

export const create = async (req: Request, res: Response): Promise<void> => {
    const productData: ProductRequest = req.body;
    try {
        const createdProduct = await createProduct(productData);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAll: RequestHandler = async (req, res) => {
    const products = await getAllProducts();
    res.status(200).json(products);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = await getProductById(productId);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
