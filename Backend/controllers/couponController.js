import Coupon from "../models/couponModel.js";

// CREATE COUPON

export const createCoupon = async (req, res) => {
  try {
    console.log("Api Hit")
    const {
      code,
      title,
      description,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      startDate,
      endDate,
      usageLimit,
      userLimit,
    } = req.body;
    console.log(code,
      title,
      description,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      startDate,
      endDate,
      usageLimit,
      userLimit,)

    if (
      !code ||
      !title ||
      !discountType ||
      discountValue === undefined ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: "Discount value must be greater than 0",
      });
    }

    if (discountType === "percentage" && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: "Percentage discount cannot be greater than 100%",
      });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than start date",
      });
    }

    const existingCoupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (existingCoupon) {
      return res.status(409).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      title,
      description,
      discountType,
      discountValue,
      maxDiscount: discountType === "percentage" ? maxDiscount || null : null,
      minOrderAmount: minOrderAmount || 0,
      startDate,
      endDate,
      usageLimit: usageLimit || null,
      userLimit: userLimit || 1,
      isActive: true,
    });
    console.log(coupon)
    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.log("Create Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create coupon",
    });
  }
};

// GET ALL COUPONS

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .sort({ createdAt: -1 })
      .select("-usedBy");

    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.log("Get Coupons Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get coupons",
    });
  }
};

// GET SINGLE COUPON

export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.log("Get Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get coupon",
    });
  }
};

// UPDATE COUPON

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      code,
      title,
      description,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      startDate,
      endDate,
      usageLimit,
      userLimit,
    } = req.body;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    if (code) {
      const duplicate = await Coupon.findOne({
        code: code.trim().toUpperCase(),
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Coupon code already exists",
        });
      }

      coupon.code = code.trim().toUpperCase();
    }

    if (title !== undefined) {
      coupon.title = title;
    }

    if (description !== undefined) {
      coupon.description = description;
    }

    if (discountType !== undefined) {
      coupon.discountType = discountType;
    }

    if (discountValue !== undefined) {
      coupon.discountValue = discountValue;
    }

    if (maxDiscount !== undefined) {
      coupon.maxDiscount =
        coupon.discountType === "percentage" ? maxDiscount : null;
    }

    if (minOrderAmount !== undefined) {
      coupon.minOrderAmount = minOrderAmount;
    }

    if (startDate !== undefined) {
      coupon.startDate = startDate;
    }

    if (endDate !== undefined) {
      coupon.endDate = endDate;
    }

    if (usageLimit !== undefined) {
      coupon.usageLimit = usageLimit;
    }

    if (userLimit !== undefined) {
      coupon.userLimit = userLimit;
    }

    if (coupon.discountType === "percentage" && coupon.discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: "Percentage discount cannot exceed 100%",
      });
    }

    if (new Date(coupon.endDate) <= new Date(coupon.startDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon dates",
      });
    }

    await coupon.save();

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.log("Update Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update coupon",
    });
  }
};

// TOGGLE COUPON STATUS

export const toggleCouponStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    return res.status(200).json({
      success: true,
      message: `Coupon ${
        coupon.isActive ? "activated" : "deactivated"
      } successfully`,
      coupon,
    });
  } catch (error) {
    console.log("Toggle Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update coupon status",
    });
  }
};

// DELETE COUPON

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await Coupon.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.log("Delete Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete coupon",
    });
  }
};

// APPLY COUPON

export const applyCoupon = async (req, res) => {
  try {
    const userId = req.userId;

    const { code, cartAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    if (cartAmount === undefined || cartAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart amount",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    // -------------------------------------------------
    // ACTIVE CHECK
    // -------------------------------------------------

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "This coupon is inactive",
      });
    }

    // -------------------------------------------------
    // DATE CHECK
    // -------------------------------------------------

    const now = new Date();

    if (now < coupon.startDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon is not active yet",
      });
    }

    if (now > coupon.endDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    // -------------------------------------------------
    // TOTAL USAGE CHECK
    // -------------------------------------------------

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    // -------------------------------------------------
    // MINIMUM ORDER
    // -------------------------------------------------

    if (cartAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    // -------------------------------------------------
    // USER USAGE CHECK
    // -------------------------------------------------

    const userUsage = coupon.usedBy.find(
      (item) => item.user?.toString() === userId.toString(),
    );

    if (userUsage && userUsage.count >= coupon.userLimit) {
      return res.status(400).json({
        success: false,
        message: "You have already used this coupon",
      });
    }

    // -------------------------------------------------
    // CALCULATE DISCOUNT
    // -------------------------------------------------

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (cartAmount * coupon.discountValue) / 100;

      if (coupon.maxDiscount !== null && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;

      if (discount > cartAmount) {
        discount = cartAmount;
      }
    }

    discount = Math.floor(discount);

    const finalAmount = Math.max(0, cartAmount - discount);

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",

      coupon: {
        id: coupon._id,
        code: coupon.code,
        title: coupon.title,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },

      cartAmount,
      discount,
      finalAmount,
    });
  } catch (error) {
    console.log("Apply Coupon Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
    });
  }
};
