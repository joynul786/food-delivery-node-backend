const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authController = require("./controllers/authController");
const app = express();

// concect DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

// routes and middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/auth", authController);


// start server
app.listen(process.env.LISTEN_PORT, () => console.log("Server has been started successfully!"));