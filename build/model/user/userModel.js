import userSchema from "./userSchema.js";
export const insertUser = (obj) => {
    return new userSchema(obj).save().then((user) => user.toObject());
};
export const getUserByEmail = (email) => {
    return userSchema.findOne({ email });
};
export const getOneUser = (filter) => {
    return userSchema.findOne(filter);
};
export const updateUserById = (_id, obj) => {
    return userSchema.findByIdAndUpdate(_id, obj);
};
//@filter, @updateObj must be an obj
export const updateUser = (filter, updateObj) => {
    return userSchema.findOneAndUpdate(filter, updateObj);
};
export const deleteUser = (_id) => {
    return userSchema.findByIdAndDelete(_id);
};
//# sourceMappingURL=userModel.js.map