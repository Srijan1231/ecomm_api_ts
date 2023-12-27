import bcrypt from "bcryptjs";
const salt: number = 10;

export const hashPassword = (plainPass: string) => {
    return bcrypt.hashSync(plainPass, salt);
};

export const comparePassword = (plainPass: string, hashPass: string) => {
    return bcrypt.compareSync(plainPass, hashPass);
};
