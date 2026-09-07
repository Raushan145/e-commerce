import express from "express";
import upload from "../middleware/multer.js";

import {
  createBanner,
  getAllBanners,
  getActiveBanners,
  getBannerById,
  updateBanner,
  toggleBannerStatus,
  deleteBanner,
} from "../controllers/bannerController.js";

const bannerRouter = express.Router();

// USER
bannerRouter.get("/active", getActiveBanners);

// ADMIN
bannerRouter.get("/all", getAllBanners);
bannerRouter.get("/:id", getBannerById);
bannerRouter.post("/create", upload.single("image"), createBanner);

bannerRouter.put("/update/:id", upload.single("image"), updateBanner);

bannerRouter.patch("/toggle/:id", toggleBannerStatus);

bannerRouter.delete("/delete/:id", deleteBanner);

export default bannerRouter;
