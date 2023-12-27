import jwt from 'jsonwebtoken';
export const createAccessJWT = async (email: string) => {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!JWT_ACCESS_SECRET) {
        throw Error('JWT_ACCESS not setup properly');
    }
    const token = jwt.sign({ email }, JWT_ACCESS_SECRET, {
        expiresIn: '15m'
    });
    return token;
};
export const verifyAccessJWT = async (token: string) => {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!JWT_ACCESS_SECRET) {
        throw Error('JWT_ACCESS not setup properly');
    }
    return jwt.verify(token, JWT_ACCESS_SECRET);

};

export const createRefreshJWT = async (email: string) => {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!JWT_REFRESH_SECRET) {
        throw Error('JWT_REFRESH not setup properly');
    }
    const token = jwt.sign({ email }, JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    });
}; 