import dotenv from "dotenv";
dotenv.config();
import express from "express";
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
//api
app.use("/category", categoryRouter);
app.use("/paymentoptions", paymentOptionRouter);
app.use("/products", productRouter);
//server
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Server up and running",
    });
});
app.use((error, req, res, next) => {
    const code = error.statusCode || 404;
    const message = error.message || "page not found";
    res.status(code).json({
        status: "error",
        message,
    });
});
//PORT
const server = app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
});
server.on('error', (error) => { console.error(`Server error: ${error.message}`); });
