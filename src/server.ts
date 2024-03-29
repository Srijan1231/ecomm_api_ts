import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 8181;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//db
import { mongoConnect } from "./db/db.js";
mongoConnect();
import categoryRouter from './routes/categoryRouter.js';
import paymentOptionRouter from './routes/paymentOptionRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import stripeRouter from './routes/stripeRouter.js';

const api = "/api/store/ts";
//api
app.use(api + "/category", categoryRouter);
app.use(api + "/paymentoptions", paymentOptionRouter);
app.use(api + "/products", productRouter);
app.use(api + "/users", userRouter);
app.use("/stripe", stripeRouter);
//server
app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "success",
        message: "Server up and running",
    });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const code = (error as any).statusCode || 404;
    const message = error.message || "page not found";
    console.log(message);
    res.status(code).json({
        status: "error",
        message,
    });
});
//PORT
const server = app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
});
server.on('error', (error: Error) => { console.error(`Server error: ${error.message}`); });