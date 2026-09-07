import express from "express";
import upload from "../middleware/multer.js";
import isAuth from '../middleware/isAuth.js'

import {
  createProduct,
  getProducts,
  getNewArrivals,
  getProductById,
  updateProduct,
  deleteProduct,
  addRecentlyViewed,
  getJustForYou,
  getProductsByCategory,
  getProductsByCollection,
  getAllProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

// CREATE
productRouter.post("/create", upload.array("images", 5), createProduct);

// GET ALL
productRouter.get("/get-all", getProducts);

productRouter.get("/all-products", getAllProducts);

// Get New Arrival Product
productRouter.get("/new-arrival", getNewArrivals);

// Get Product By category
productRouter.get("/:categoryId/products", getProductsByCategory);
productRouter.get("/collection/:collectionId/products", getProductsByCollection);

// GET BY ID
productRouter.get("/get/:id", getProductById);

// UPDATE
productRouter.put("/update/:id", upload.array("images", 5), updateProduct);

// DELETE
productRouter.delete("/delete/:id", deleteProduct);

// Recently Viewed
productRouter.post("/view/:productId", isAuth, addRecentlyViewed);

// Just For You
productRouter.get("/just-for-you", isAuth, getJustForYou);

export default productRouter;
