import mongoose from "mongoose";

export const mongoConnect = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;

        if (!mongoUrl) {
            throw new Error("MongoDB connection URL is not defined.");
        }

        const conn = await mongoose.connect(mongoUrl);
        conn && console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
};
