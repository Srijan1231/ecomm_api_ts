import express, { NextFunction, Request, Response } from "express";
import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import { CustomRequest, auth, refreshAuth } from "../middleware/auth.js";
import { loginValidation, newUserValidation, updateUserValidation } from "../middleware/joiValidation.js";
import { deleteUser, getUserByEmail, insertUser, updateUser, updateUserById } from "../model/user/userModel.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.js";
import { deleteManySession, deleteSession } from "../model/session/sessionModel.js";

const router = express.Router();

router.get("/", auth, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        res.json({
            status: "success",
            message: "here is the user info",
            user: req.userInfo,
        });
        next();
    } catch (error) {
        next(error);
    }

});
router.post("/", newUserValidation, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...rest } = req.body;

        req.body.password = hashPassword(password);

        const result = await insertUser(req.body);


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
        } res.json({
            status: "error",
            message: "Invalid login details",
        }).status(500);
    } catch (error: any) {
        next(error);

    }

});
router.get("/get/access_jwt", refreshAuth);

router.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessJWT, refreshJWT, _id } = req.body;

        accessJWT && deleteSession(accessJWT);

        if (refreshJWT && _id) {
            const dt = await updateUserById(_id, { refreshJWT: "" });
            res.json({
                status: "success",
                message: "Come back soon"
            });
        }
        res.json({
            status: "error",
            message: "Error while Logout",
        }).status(500);


    } catch (error) {
        next(error);
    }
});

router.put('/update', auth, updateUserValidation, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, password, ...rest } = req.body;

        const result = await updateUser({ _id }, { password: password, ...rest });
        result?._id
            ? res.json({
                status: "success",
                message: "The user  has been updated successfully",
            })
            : res.json({
                status: "error",
                message: "Unable to update user, try again later",
            });
    } catch (error) {
        next(error);
    }
});
router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, email } = req.body;

        const user = await deleteUser(_id);
        // console.log(user);
        const session = await deleteManySession(email);

        user && (session?.deletedCount > 0)
            ? res.json({
                status: "success",
                message: 'The user has been deleted successfully along with its associated info'
            }).status(200) : res.json({
                status: "error",
                message: 'Unable to delete the user'
            }).status(500);


    } catch (error) {
        next(error);
    }
});
export default router;