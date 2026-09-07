import express from "express";

import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
  applyCoupon,
} from "../controllers/couponController.js";

import isAuth from "../middleware/isAuth.js";

const couponRouter = express.Router();

// OWNER

couponRouter.post("/create", isAuth, createCoupon);

couponRouter.get("/all", isAuth, getAllCoupons);

couponRouter.get("/:id", isAuth, getCouponById);

couponRouter.put("/update/:id", isAuth, updateCoupon);

couponRouter.patch("/toggle/:id", isAuth, toggleCouponStatus);

couponRouter.delete("/delete/:id", isAuth, deleteCoupon);

// =====================================================
// USER
// =====================================================

couponRouter.post("/apply", isAuth, applyCoupon);

export default couponRouter;
