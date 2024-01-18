import express from 'express';
import { productModel } from '../models/productSchema';
import { verifyToken, verifyAdmin } from '../middlewares/verifyToken';

const productController = express.Router();

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

// Get one
module.exports = productController.get("/find/:id", verifyToken, async (req, resp) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            return resp.status(200).send(product);
        } else {
            return resp.status(500).send({ Msg: "No product with such id!" });
        }
    } catch (error) {
        console.error(error);
    };
});

// Create products
module.exports = productController.post("/", verifyAdmin, async (req, resp) => {
  try {
    const newProduct = await productModel.create({ ...req.body });
    return resp.status(201).send(newProduct);
  } catch (error) {
    console.error(error);
  }
});