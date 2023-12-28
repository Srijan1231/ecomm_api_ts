import userSchema from "./userSchema.js";

export const insertUser = (obj: Record<string, any>) => {
    return new userSchema(obj).save().then((user) => user.toObject());
};

export const getUserByEmail = (email: string) => {
    return userSchema.findOne({ email });
};

export const getOneUser = (filter: any) => {
    return userSchema.findOne(filter);
};

export const updateUserById = (_id: string, obj: Record<string, any>) => {
    return userSchema.findByIdAndUpdate(_id, obj);
};
//@filter, @updateObj must be an obj
export const updateUser = (filter: any, updateObj: any) => {

    return userSchema.findOneAndUpdate(filter, updateObj);
};

export const deleteUser = (_id: string) => {
    return userSchema.findByIdAndDelete(_id);
};
