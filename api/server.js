import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import gigRouter from "./routes/gig.route.js";
import messageRouter from "./routes/message.route.js";
import chatRouter from "./routes/chat.route.js";
import categoryRouter from "./routes/category.route.js";
import paymentRouter from "./routes/payment.route.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/gig", gigRouter);
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);
app.use("/api/payment", paymentRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected...");
  })
  .catch((e) => e.message);

app.listen(port, () => console.log("Runn on port", port));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
