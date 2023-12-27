import SessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj: Record<string, any>) => {
    return new SessionSchema(obj).save().then((session) => session.toObject());
};

// @token should be a string
export const deleteSession = async (token: string) => {
    const dt = await SessionSchema.findOneAndDelete({ token });
    return;
};
