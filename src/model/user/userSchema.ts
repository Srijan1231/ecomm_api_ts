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
    favouriteProduct: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                required: true,

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

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);