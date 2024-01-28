const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 4,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        require: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        require: true,
        min: 8,
        trim: true,
    },
    img: {
        type: String,
        require: true,
    },
    reviews: {
        type: Number,
        require: true,
        trim: true,
    },
    category: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
});

module.exports = mongoose.model("products", productSchema);