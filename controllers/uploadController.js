const uploadController = require("express").Router();
const multer = require("multer");
const { verifyAdmin } = require("../middlewares/verifyToken");

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
module.exports = uploadController.post("/image", verifyAdmin, upload, (_, resp) => {
    try {
        return resp.status(201).send({ Msg: "Successfully uploaded file!" });
    } catch (error) {
        console.error(error);
    };
});