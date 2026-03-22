const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const productRouter = express.Router();

//Web frontend routes
productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };
