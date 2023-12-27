import mongoose, { Document, model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: false
        },
        lName: {
            type: String,
            required: false

        },

        address: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            unique: true,
            index: 1,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        favouriteProduct: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    required: false,
                    unique: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                slug: {
                    type: String,

                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },

                sku: {
                    type: String,

                    required: true,
                },

                thumbnail: {
                    type: String,
                    required: true,
                },
            },
        ],

        refreshJWT: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);
interface UserDocument extends Document {
    fname?: string,
    lname?: string,
    address?: string,
    email: string,
    password: string,
    favouriteProduct?: string[];
    refreshJWT: string,

}

const userModel = model<UserDocument>('User', userSchema);

export { userModel, UserDocument };
