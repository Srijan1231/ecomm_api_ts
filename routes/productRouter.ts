import express, { NextFunction, Request, Response } from 'express';
import { getProductById, getProducts } from '../model/product/productModel.js';

const router = express.Router();

router.get(':_id?', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { _id } = req.params;
        const product = _id ? await getProductById(_id) : await getProducts();

        res.json({
            status: "success",
            message: "Here are the product/s",
            product,
        });
    } catch (error) {
        next(error);
    }
});
export default router;