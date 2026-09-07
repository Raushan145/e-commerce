import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    // =========================
    // USER
    // =========================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // ORDER ITEMS
    // =========================

    items: [orderItemSchema],

    // =========================
    // ADDRESS
    // =========================

    shippingAddress: {
      fullName: String,
      mobile: String,
      addressLine1: String,
      addressLine2: String,
      landmark: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    // =========================
    // PRICE
    // =========================

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // =========================
    // COUPON
    // =========================

    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },

    couponCode: {
      type: String,
      default: "",
    },

    // =========================
    // PAYMENT
    // =========================

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    // =========================
    // ORDER STATUS
    // =========================

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "placed",
    },

    // =========================
    // TIMELINE
    // =========================

    timeline: {
      placed: {
        type: Date,
        default: Date.now,
      },

      confirmed: {
        type: Date,
        default: null,
      },

      processing: {
        type: Date,
        default: null,
      },

      shipped: {
        type: Date,
        default: null,
      },

      outForDelivery: {
        type: Date,
        default: null,
      },

      delivered: {
        type: Date,
        default: null,
      },

      cancelled: {
        type: Date,
        default: null,
      },
    },

    // =========================
    // CANCEL / RETURN
    // =========================

    cancellationReason: {
      type: String,
      default: "",
    },

    returnReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;