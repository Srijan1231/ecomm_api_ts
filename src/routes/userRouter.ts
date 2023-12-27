import express, { NextFunction, Request, Response } from "express";
import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import { CustomRequest, auth } from "../middleware/auth.js";
import { loginValidation, newUserValidation } from "../middleware/joiValidation.js";
import { getUserByEmail, insertUser } from "../model/user/userModel.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.js";

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

router.post("/sign-in", loginValidation, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (user?._id) {
            const isMatched = comparePassword(password, user.password);
            if (isMatched) {
                //create 2 jwts:

                const accessJWT = await createAccessJWT(email);
                const refreshJWT = await createRefreshJWT(email);

                //// create accessJWT and store in session table: short live 15m
                //// create refreshJWT and store with user data in user table: long live 30d

                return res.json({
                    status: "success",
                    message: "LoggedIn",
                    token: { accessJWT, refreshJWT },
                });
            }
        }
        res.json({
            status: "error",
            message: "Invalid login details",
        });
    } catch (error: any) {
        next(error);

    }

});



export default router;