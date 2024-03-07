import mongoose, { Document } from 'mongoose';

// Define a schema-less schema using Schema.Types.Mixed
const productSchema = new mongoose.Schema({}, { strict: false });

// Define the interface for the Category document
interface ProductDocument extends Document {
    [key: string]: any;
}

// Create the Mongoose model for the "categories" collection
const product = mongoose.model<ProductDocument>('products', productSchema);

export const getProducts = () => {
    return product.find();
};
export const getProductById = (_id: string) => {
    return product.findById(_id);
};
export const getProductsByCategory = (filter: string) => {
    const _id = new mongoose.Types.ObjectId(filter);
    return product.find({ parentCat: _id });
};
// export const getSingleProduct = (filter) => {
//   return product.findOne(filter);
// };
