import express from "express";
import ProductController from "../controllers/productController.js";
import { validateProduct } from "../middleware/validation.js";
import auth from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();
const productController = new ProductController(Product);

router.post(
  "/",
  auth,
  validateProduct,
  productController.createProduct.bind(productController)
);

router.get("/", productController.getAllProducts.bind(productController));

router.get("/:id", productController.getProductById.bind(productController));

router.put(
  "/:id",
  auth,
  validateProduct,
  productController.updateProduct.bind(productController)
);

router.delete(
  "/:id",
  auth,
  productController.deleteProduct.bind(productController)
);

export default router;
