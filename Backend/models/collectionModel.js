import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;