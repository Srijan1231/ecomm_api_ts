import mongoose, { model } from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        associate: {
            type: String,
            required: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

interface sessionDocument extends Document {
    token: string,
    associate: string;

}

const sessionModel = model<sessionDocument>('sessionUser', sessionSchema);

export { sessionModel, sessionDocument }; ///sessions
