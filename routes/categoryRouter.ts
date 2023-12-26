import express, { NextFunction, Request, Response } from "express";
import { getCategoryById, getCategories } from "../model/category/CategoryModel.js";


const router = express.Router();
router.get("/:_id?", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const category = _id ? await getCategoryById(_id) : await getCategories();

        res.json({
            status: "success",
            message: "Here are the category/s",
            category,
        });
    } catch (error) {
        next(error);
    }
});
export default router;
