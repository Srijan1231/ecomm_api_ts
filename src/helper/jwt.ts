import jwt from 'jsonwebtoken';
import { insertNewSession } from '../model/session/sessionModel.js';
import { updateUser } from '../model/user/userModel.js';
export const createAccessJWT = async (email: string) => {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

    if (!JWT_ACCESS_SECRET) {
        throw Error('JWT_ACCESS not setup properly');
    }

    const token = jwt.sign({ email }, JWT_ACCESS_SECRET, {
        expiresIn: '15m'
    });
    const dt = await insertNewSession({ token, associate: email });
    console.log(dt);
    return token;
};
export const verifyAccessJWT = async (token: string | undefined) => {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!JWT_ACCESS_SECRET) {
        throw Error('JWT_ACCESS not setup properly');
    }
    if (!token) {
        throw Error('JWT token must be provided');
    }
    return jwt.verify(token, JWT_ACCESS_SECRET);

};

export const createRefreshJWT = async (email: any) => {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_REFRESH_SECRET) {
        throw Error('JWT_REFRESH not setup properly');
    }
    const token = jwt.sign({ email }, JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    });
    await updateUser({ email }, { refreshJWT: token });

    return token;
};

export const verifyRefreshJWT = async (token: string | undefined) => {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_REFRESH_SECRET) {
        throw Error('JWT_REFRESH not setup properly');
    }
    if (!token) {
        throw Error('JWT token must be provided');
    }
    return jwt.verify(token, JWT_REFRESH_SECRET);
};