import express, { NextFunction, Request, Response } from "express";

import { getpaymentOption, getpaymentOptionById } from "../model/paymentOption/paymentOModel.js";


const router = express.Router();
router.get("/:_id?", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const paymentOption = _id ? await getpaymentOptionById(_id) : await getpaymentOption();

        res.json({
            status: "success",
            message: "Here are the PaymentOption/s",
            paymentOption,
        });
    } catch (error) {
        next(error);
    }
});
export default router;
