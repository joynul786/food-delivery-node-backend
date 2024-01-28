const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 50,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}); 

module.exports = mongoose.model("users", userSchema);