import { sessionDocument, sessionModel } from "./sessionSchema.js";

export const insertNewSession = ({ token, associate }: { token: any, associate: string; }): Promise<sessionDocument | null> => {
    return new sessionModel({ token, associate }).save();
};

export const deleteSession = async ({ token }: { token: string; }): Promise<sessionDocument | null> => {
    const dt = await sessionModel.findOneAndDelete({ token });
    return dt;
};
