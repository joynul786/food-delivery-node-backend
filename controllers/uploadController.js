import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken';

const uploadController = express.Router();

// File upload
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, resp, cb) {
            cb(null, "public/images");
        },
        filename: function (req, file, cb) {
            cb(null, req.body.filename);
        },
    }),
}).single("image");

// API for file upload
module.exports = uploadController.post("/image", verifyToken, upload, (_, resp) => {
    try {
        return resp.status(201).send({ Msg: "Successfully uploaded file!" });
    } catch (error) {
        console.error(error);
    };
});