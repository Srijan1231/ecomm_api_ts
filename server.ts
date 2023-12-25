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


//server
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const code = (error as any).statusCode || 404;
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
server.on('error', (error: Error) => { console.error(`Server error: ${error.message}`); });