import mongoose from 'mongoose';
// Define a schema-less schema using Schema.Types.Mixed
const paymentOptionSchema = new mongoose.Schema({}, { strict: false });
// Create the Mongoose model for the "categories" collection
const paymentOption = mongoose.model('paymentoptions', paymentOptionSchema);
export const getpaymentOption = () => {
    return paymentOption.find();
};
export const getpaymentOptionById = (_id) => {
    return paymentOption.findById(_id);
};
// export const getProductsByCategory = (filter) => {
//     const _id = new mongoose.Types.ObjectId(filter);
//     return product.find({ parentCat: _id });
// };
// export const getSingleProduct = (filter) => {
//   return product.findOne(filter);
// };
//# sourceMappingURL=paymentOModel.js.map