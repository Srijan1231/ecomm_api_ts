import { sessionDocument, sessionModel } from "./sessionSchema.js";
interface insertNewSessionProps {
    obj: object;
}
interface deleteSessionProps {
    token: string;
}

export const insertNewSession = ({ obj }: insertNewSessionProps): Promise<sessionDocument | null> => {
    return new sessionModel(obj).save();
};

// @token should be a string
export const deleteSession = async (token: deleteSessionProps): Promise<sessionDocument | null> => {
    const dt = await sessionModel.findOneAndDelete({ token });
    return dt;
};
