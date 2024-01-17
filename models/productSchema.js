const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 4,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
        min: 8,
    },
    img: {
        type: String,
        require: true,
    },
    reviews: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("products", productSchema);