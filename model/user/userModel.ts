import { Types } from "mongoose";
import { UserDocument, userModel } from "./userSchema";

interface InsertUserParams {
    obj: object;
}

interface GetUserByIdParams {
    _id: string;
}

interface FindOneUserByFilterParams {
    filter: object;
}

interface UpdateUserByIdParams {
    _id: string;
    [key: string]: any; // Rest of the properties
}

// interface UpdateUserParams {
//     filter: object;
//     updateObj: object;
// }

interface DeleteUserByIdParams {
    _id: string;
}

// Function implementations with TypeScript

export const insertUser = ({ obj }: InsertUserParams): Promise<UserDocument> => {
    return new userModel(obj).save();
};

export const getUsers = (): Promise<UserDocument[]> => {
    return userModel.find().exec();
};

export const getUserById = ({ _id }: GetUserByIdParams): Promise<UserDocument | null> => {
    return userModel.findById(_id).exec();
};

export const findOneUserByFilter = ({ filter }: FindOneUserByFilterParams): Promise<UserDocument | null> => {
    return userModel.findOne(filter).exec();
};

export const updateUserById = ({ _id, ...rest }: UpdateUserByIdParams): Promise<UserDocument | null> => {
    return userModel.findByIdAndUpdate(_id, rest, { new: true }).exec();
};

// export const updateOrder = ({ filter, updateObj }: UpdateOrderParams): Promise<OrderDocument | null> => {
//     return OrderSchema.findOneAndUpdate(filter, updateObj, { new: true }).exec();
// };

export const deleteUserbyId = async ({ _id }: { _id: Types.ObjectId; }): Promise<UserDocument | null> => {
    const result = await userModel.findByIdAndDelete(_id).lean().exec();

    // If the result is null, return null
    if (!result) {
        return null;
    }

    // If the result is not null, cast it to your UserDocument type
    return result as UserDocument;
};