import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    // Percentage coupon ke liye maximum discount
    maxDiscount: {
      type: Number,
      default: null,
      min: 0,
    },

    // Minimum cart amount
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // Total kitni baar coupon use ho sakta hai
    usageLimit: {
      type: Number,
      default: null,
      min: 1,
    },

    // Abhi tak kitni baar use hua
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Ek user kitni baar use kar sakta hai
    userLimit: {
      type: Number,
      default: 1,
      min: 1,
    },

    // Coupon kis user ne use kiya
    usedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        count: {
          type: Number,
          default: 0,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;