const express = require("express");

const router = express.Router();
const ProductController = require('../controllers/Product');
const UploadFile = require('../middlewares/UploadFile')


// Route
router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductById);
router.delete("/product/:id", ProductController.deleteProduct);
router.post("/product/add", UploadFile.uploadFile("image"), ProductController.addProduct);
router.put("/product/:id", UploadFile.uploadFile("image"), ProductController.editProduct);

module.exports = router;
