import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authController from "./controllers/authController";
import productController from "./controllers/productController";
import uploadController from "./controllers/uploadController";

const app = express();

// concect DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authController);
app.use("/product", productController);
app.use("/image", uploadController);

// start server
app.listen(process.env.LISTEN_PORT, () => console.log("Server has been started successfully!"));