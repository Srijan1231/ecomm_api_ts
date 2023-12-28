import SessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj: Record<string, any>) => {
    return new SessionSchema(obj).save().then((session) => session.toObject());
};

// @token should be a string
export const deleteSession = async (token: Record<string, any>) => {
    const dt = await SessionSchema.findOneAndDelete({ token });
    return;
};
export const deleteManySession = async (email: any | undefined) => {

    const dt = await SessionSchema.deleteMany({ associate: email });
    // console.log(dt);
    return dt;
};