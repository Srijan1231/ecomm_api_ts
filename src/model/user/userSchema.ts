import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
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
    refreshJWT: {
        type: String,
        default: "",
    },

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);