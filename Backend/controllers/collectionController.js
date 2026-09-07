import Collection from "../models/collectionModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// CREATE COLLECTION

export const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    // Check duplicate name
    const existingCollection = await Collection.findOne({
      name: name.trim(),
    });

    if (existingCollection) {
      return res.status(400).json({
        success: false,
        message: "Collection already exists",
      });
    }

    // Image required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Collection image is required",
      });
    }

    // UPLOAD IMAGE TO CLOUDINARY

    const image = await uploadOnCloudinary(req.file.path);

    if (!image) {
      return res.status(500).json({
        success: false,
        message: "Collection image upload failed",
      });
    }

    // CREATE SLUG

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // CREATE COLLECTION

    const collection = await Collection.create({
      name: name.trim(),
      slug,
      description: description?.trim() || "",
      image,

      products: [],

      isActive: true,
      isFeatured: false,

      startDate: null,
      endDate: null,

      sortOrder: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collection,
    });
  } catch (error) {
    console.log("Create Collection Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create collection",
      error: error.message,
    });
  }
};

// UPDATE COLLECTION

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Find collection
    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    // UPDATE NAME

    if (name?.trim()) {
      const existingCollection = await Collection.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingCollection) {
        return res.status(400).json({
          success: false,
          message: "Collection name already exists",
        });
      }

      collection.name = name.trim();

      collection.slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // UPDATE DESCRIPTION

    if (description !== undefined) {
      collection.description = description.trim();
    }

    // UPDATE IMAGE

    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);

      if (!image) {
        return res.status(500).json({
          success: false,
          message: "Collection image upload failed",
        });
      }

      collection.image = image;
    }

    await collection.save();

    return res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      collection,
    });
  } catch (error) {
    console.log("Update Collection Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update collection",
      error: error.message,
    });
  }
};

// DELETE COLLECTION

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    // DELETE FROM DATABASE

    await Collection.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.log("Delete Collection Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete collection",
      error: error.message,
    });
  }
};

// GET ALL COLLECTIONS

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find()
      .sort({ sortOrder: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Collections fetched successfully",
      collections,
    });
  } catch (error) {
    console.log("Get Collections Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch collections",
      error: error.message,
    });
  }
};

// GET SINGLE COLLECTION

export const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    console.log("Get Collection Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch collection",
      error: error.message,
    });
  }
};