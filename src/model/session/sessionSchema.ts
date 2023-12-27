import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,

    },
    associate: {
        type: String,
        required: true,
        default: ''
    }
});

export default mongoose.model('SessionUser', sessionSchema);