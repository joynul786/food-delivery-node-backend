const authController = require("express").Router();
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/verifyToken");

// API for register
module.exports = authController.post("/register", async (req, resp) => {
    try {
        const { username, email, password } = req.body;
        
        const isExisting = await userModel.findOne({ email: email });
        if (isExisting) {
            throw new Error("Already have this user with the same email address!");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); 
            
            let newUserDetails = await userModel.create({ username, email, password:hashedPassword });
            newUserDetails = newUserDetails.toObject();
            delete newUserDetails.password;

            const Token = JWT.sign({ id: newUserDetails._id, isAdmin: newUserDetails.isAdmin }, process.env.JWT_SECRET, { expiresIn: "12h" });
            
            return resp.status(201).send({ newUserDetails, Token });
        };
            
    } catch (error) {
        return resp.status(500).send(error.message);
    };
});

// API for login
module.exports = authController.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;

        let userExist = await userModel.findOne({ email: email });
        if (userExist && (await bcrypt.compare(password, userExist.password))) {

            userExist = userExist.toObject();
            delete userExist.password;

            const Token = JWT.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, process.env.JWT_SECRET, { expiresIn: "12h" });

            return resp.status(202).send({ userExist, Token });
        } else {
            throw new Error("Email or Password is wrong!");
        };
        
    } catch (error) {
        return resp.status(500).send(error.message);
    };
});

// Api for signed up password update
module.exports = authController.put("/password-update", async (req, resp) => {
    const { email, password } = req.body;
    try {
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const resultData = await userModel.updateOne(
                { email: email },
                { $set: { password: hashedPassword } },
            );
            resultData && resp.status(201).send({Msg: "Password has been changed successfully!"})
        } else {
            throw new Error("This Email does not exist!!");
        };
    } catch (error) {
        return resp.status(500).send(error.message);
    };
});

// Api for delete account
module.exports = authController.delete("/account-delete/:id", verifyToken, async (req, resp) => {
    try {
        const userAccount = await userModel.deleteOne({ _id: req.params.id });
        if (userAccount) {
            resp.status(200).send({ Msg: "Your account has been deleted successfully!!" });
        } else {
            throw new Error("Something went wrong!");
        };

    } catch (error) {
        return resp.status(500).send(error.message);
    };
});