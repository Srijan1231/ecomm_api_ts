import userSchema from "./userSchema.js";

export const insertUser = (obj: Record<string, any>) => {
    return new userSchema(obj).save();
};

export const getUserByEmail = (email: string) => {
    return userSchema.findOne({ email });
};

export const getOneUser = (filter: any) => {
    return userSchema.findOne(filter);
};

export const updateUserById = (_id: any, obj: Record<string, any>) => {
    return userSchema.findByIdAndUpdate(_id, obj);
};
//@filter, @updateObj must be an obj
export const updateUser = (filter: Record<string, any>, updateObj: Record<string, any>) => {
    return userSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteUser = (_id: string) => {
    return userSchema.findByIdAndDelete(_id);
};
