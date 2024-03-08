import mongoose from 'mongoose';
// Define a schema-less schema using Schema.Types.Mixed
const productSchema = new mongoose.Schema({}, { strict: false });
// Create the Mongoose model for the "categories" collection
const product = mongoose.model('products', productSchema);
export const getProducts = () => {
    return product.find();
};
export const getProductById = (_id) => {
    return product.findById(_id);
};
export const getProductsByCategory = (filter) => {
    const _id = new mongoose.Types.ObjectId(filter);
    return product.find({ parentCat: _id });
};
// export const getSingleProduct = (filter) => {
//   return product.findOne(filter);
// };
//# sourceMappingURL=productModel.js.map