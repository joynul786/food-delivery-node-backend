const uploadController = require("express").Router();
const multer = require("multer");
const { verifyToken } = require("../middlewares/verifyToken");

// File upload
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, resp, cb) {
            cb(null, "assets/images");
        },
        filename: function (req, file, cb) {
            cb(null, req.body.filename);
        },
    }),
}).single("image");

// API for file upload
module.exports = uploadController.post("/image", verifyToken, upload, (_, resp) => {
    try {
        return resp.status(201).json({ Msg: "Successfully uploaded file!" });
    } catch (error) {
        console.error(error);
    };
});