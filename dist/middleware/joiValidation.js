import Joi from "joi";
const SHORTSTRREQ = Joi.string().min(3).max(100).required();
const SHORTSTR = Joi.string().min(3).max(100);
const LONGSTR = Joi.string().min(3).max(1000);
const NUM = Joi.number();
const NUMREQ = Joi.number().required();
export const newUserValidation = (req, res, next) => {
};
