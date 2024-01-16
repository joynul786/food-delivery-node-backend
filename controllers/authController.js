const authController = require("express").Router();
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// API for register
authController.post("/register", async (req, resp) => {
    try {
        const { username, email, password } = req.body;
        
        const isExisting = await userModel.findOne({ email: email });
        if (isExisting) {
            throw new Error({ Result: "Already have this user with the same email address!" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); 
            
            let newUserDetails = await userModel.create({ username, email, hashedPassword });
            newUserDetails = newUserDetails.toObject();
            delete newUserDetails.hashedPassword;

            const Token = JWT.sign({ id: newUserDetails._id, isAdmin: newUserDetails.isAdmin }, process.env.JWT_SECRET, { expiresIn: "12h" });
            
            return resp.status(201).json({ newUserDetails, Token });
        };
            
    } catch (error) {
        return resp.status(500).json(error.message);
    };
});

module.exports = authController;