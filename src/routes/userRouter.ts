import express, { NextFunction, Request, Response } from "express";
import { hashPassword } from "../helper/bcrypt.js";
import { CustomRequest, auth } from "../middleware/auth.js";
import { newUserValidation } from "../middleware/joiValidation.js";
import { insertUser } from "../model/user/userModel.js";

const router = express.Router();

router.get("/", auth, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        res.json({
            status: "success",
            message: "here is the user info",
            user: req.userInfo,
        });
    } catch (error) {
        next(error);
    }

});
router.post("/", newUserValidation, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...rest } = req.body;
        console.log(req.body);
        req.body.password = hashPassword(password);

        const result = await insertUser(req.body);
        console.log(result);

        if (result?._id) {
            res.json({
                status: "success",
                message: "Account created successfully",
            });

            return;
        }

        res.json({
            status: "error",
            message: "Unable to add new user, Please try again later",
        });
    } catch (error: any) {
        console.log(error.message);
        if (error.message.includes("E11000 duplicate key error")) {
            error.statusCode = 400;
            error.message =
                "This email is already used by another User, Use different email or reset your password";
        }

        next(error);
    }
});



export default router;