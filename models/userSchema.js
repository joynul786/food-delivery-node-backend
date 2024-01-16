const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max:50,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}); 

module.exports = mongoose.model("users", userSchema);