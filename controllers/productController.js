const productController = require("express").Router();
const productModel = require("../models/productSchema");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");

// Get all
module.exports = productController.get("/", verifyToken, async (req, resp) => {
    try {
        const products = await productModel.find(req.query);
        if (products) {
            return resp.status(200).send(products);
        } else {
            resp.status(500).send({ Msg: "some thing went wrong for products fetching!" });
        };
    } catch (error) {
        console.error(error);
    };
});

// Create products
module.exports = productController.post("/", verifyAdmin, async (req, resp) => {
    try {
        const { title, description, category, img, price } = req.body;
        if (title, description, category, img, price) {
            const newProduct = await productModel.create({ ...req.body });
            return resp.status(201).send(newProduct);
        };
    } catch (error) {
        console.error(error);
    };
});