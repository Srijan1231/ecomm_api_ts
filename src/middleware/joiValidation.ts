import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const SHORTSTRREQ = Joi.string().min(3).max(100).required();
const SHORTSTR = Joi.string().min(3).max(100);
const LONGSTR = Joi.string().min(3).max(1000);
const NUM = Joi.number();
const NUMREQ = Joi.number().required();


export const newUserValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
            password: SHORTSTRREQ.min(6),


        });
        const { error } = schema.validate(req.body);
        error
            ? res.json({
                status: "error",
                message: error.message,
            })
            : next();
    } catch (error) {
        next(error);
    }


};
export const updateUserValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = req.body.password;
        const schema = Joi.object({
            fName: SHORTSTRREQ,
            lName: SHORTSTRREQ,
            email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
            address: LONGSTR.allow(""),
        });
        const { error } = schema.validate(req.body);
        error ?
            res.json({
                status: 'error',
                message: error.message
            })
            : next();
    } catch (error) {
        next(error);
    }
};

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            email: SHORTSTR.email({ minDomainSegments: 2 }).required(),
            password: SHORTSTRREQ.min(6),


        });
        const { error } = schema.validate(req.body);
        error ?
            res.json({
                status: 'error',
                message: error.message
            })
            : next();
    } catch (error) {
        next(error);
    }
};
