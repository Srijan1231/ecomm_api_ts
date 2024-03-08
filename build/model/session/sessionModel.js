import SessionSchema from "./sessionSchema.js";
export const insertNewSession = (obj) => {
    return new SessionSchema(obj).save().then((session) => session.toObject());
};
// @token should be a string
export const deleteSession = async (token) => {
    const dt = await SessionSchema.findOneAndDelete({ token });
    return;
};
export const deleteManySession = async (email) => {
    const dt = await SessionSchema.deleteMany({ associate: email });
    // console.log(dt);
    return dt;
};
//# sourceMappingURL=sessionModel.js.map