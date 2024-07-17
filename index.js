import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import transactionRouter from "./routes/order.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// route
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/transaction", transactionRouter);

// handler error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});