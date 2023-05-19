import {PrismaClient} from "@prisma/client";
import {ProductResponse, ProductResponseSchema} from "./model/product-response";
import {ProductRequest} from "./model/product-request";

const prisma = new PrismaClient();

export const createProduct = async (product: ProductRequest): Promise<ProductResponse> => {
    const created = await prisma.product.create({
        data: {
            title: product.title,
            description: product.description,
            price: product.price,
            sizes: product.sizes,
            images: product.images,
            gender: product.gender,
        },
    });
    return ProductResponseSchema.parse(created);
};

export const getProductById = async (id: number): Promise<ProductResponse | undefined> => {
    const product = await prisma.product.findUnique({
        where: {
            id: id,
        },
    });
    if (product) {
        return ProductResponseSchema.parse(product);
    }
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    const products = await prisma.product.findMany();
    return products.map((product) => ProductResponseSchema.parse(product));
};
