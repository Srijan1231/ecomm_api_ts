import mongoose from 'mongoose';
// Define a schema-less schema using Schema.Types.Mixed
const categorySchema = new mongoose.Schema({}, { strict: false });
// Create the Mongoose model for the "categories" collection
const category = mongoose.model('categories', categorySchema);
export const getCategories = () => {
    return category.find();
};
export const getCategoryById = (_id) => {
    return category.findById(_id);
};
// export const getProductsByCategory = (filter) => {
//     const _id = new mongoose.Types.ObjectId(filter);
//     return product.find({ parentCat: _id });
// };
// export const getSingleProduct = (filter) => {
//   return product.findOne(filter);
// };
//# sourceMappingURL=CategoryModel.js.map