
import { NextFunction, Response, Request } from 'express';
import { createAccessJWT, verifyAccessJWT, verifyRefreshJWT } from '../helper/jwt.js';
import { getOneUser, getUserByEmail } from '../model/user/userModel.js';

interface User {
    email: string;
    password: string;
    fName: string;
    lName: string;
    address: string;
    refreshJWT: string;
}
export interface CustomRequest extends Request {
    userInfo?: User;
}
export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        //1 get jwt token from request.headers.authorization 
        const { authorization } = req.headers;

        //2 decode or decrypt incoming jwt(it is always accessJWT) token 
        const decodedJWT: any = await verifyAccessJWT(authorization);
        console.log(decodedJWT);
        //3 extract email from decodedJWT  and find user with that email
        if (decodedJWT.email) {
            const user: any = await getUserByEmail(decodedJWT.email);
            if (user?._id) {
                user.refreshJWT = undefined;
                // user.password = undefined;

                req.userInfo = user;
                return next();
            }

        }
        res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });




    } catch (error: any) {
        if (error.message.includes("jwt expired")) {
            error.statusCode = 403;
            error.message = error.message;
        }
        if (error.message.includes("invalid signature")) {
            error.statusCode = 401;
            error.message = error.message;
        }
        next(error);

    }

};
export const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1.get the accessJWT
        const { authorization } = req.headers;

        //2. decode the jwt

        const decodedJWT: any = await verifyRefreshJWT(authorization);

        // 3. extract the email and get user by email
        if (decodedJWT?.email) {
            //4. check if user is active
            const user = await getOneUser({
                email: decodedJWT.email,
                refreshJWT: authorization,
            });

            if (user?._id) {
                // create new accessJWT
                const token = await createAccessJWT(decodedJWT.email);

                return res.json({
                    status: "success",
                    token,
                });
            }
        }

        res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    } catch (error) {
        next(error);
    }
};