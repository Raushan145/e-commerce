import express from "express";
import upload from "../middleware/multer.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", upload.single("image"), createCategory);
categoryRouter.get("/get", getCategories);
categoryRouter.get("/get/:id", getCategoryById);
categoryRouter.put("/update/:id", upload.single("image"), updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
