import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      trim: true,
      default: "",
    },

    title: {
      type: String,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      trim: true,
      default: "SHOP NOW",
    },

    buttonLink: {
      type: String,
      trim: true,
      default: "/products",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;