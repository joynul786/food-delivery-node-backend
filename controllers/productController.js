const productController = require("express").Router();
const productModel = require("../models/productSchema");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");

// Get all
module.exports = productController.get("/", verifyToken, async (req, resp) => {
    try {
        const products = await productModel.find(req.query);
        if (products) {
            return resp.status(200).json(products);
        } else {
            resp.status(500).json({ Msg: "some thing went wrong for products fetching!" });
        };
    } catch (error) {
        console.error(error);
    };
});

// Get one
module.exports = productController.get("/find/:id", verifyToken, async (req, resp) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            return resp.status(200).json(product);
        } else {
            return resp.status(500).json({ Msg: "No product with such id!" });
        }
    } catch (error) {
        console.error(error);
    };
});

// Create products
module.exports = productController.post("/", verifyAdmin, async (req, resp) => {
    const { title, price, desc, img, reviews, category } = req.body;
    try {
        if (title, price, desc, img, reviews, category) {
            const newProduct = await productModel.create({...req.body});
            return resp.status(201).json(newProduct);
        } else {
            return resp.status(400).json({ Msg: "All details of product is must required!" });
        };
    } catch (error) {
        console.error(error);
    };
});