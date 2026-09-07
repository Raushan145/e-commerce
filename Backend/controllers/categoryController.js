import Category from "../models/categoryModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// CREATE CATEGORY

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Category image is required",
      });
    }

    // Check duplicate category
    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Cloudinary upload
    const image = await uploadOnCloudinary(req.file.path);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      image,
      products: [],
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("Create Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log("Get Categories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get categories",
      error: error.message,
    });
  }
};

// GET CATEGORY BY ID

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log("Get Category By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get category",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Update name
    if (name?.trim()) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }

      category.name = name.trim();
    }

    // Update image only if new image selected
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);

      if (!image) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }

      category.image = image;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("Update Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// DELETE CATEGORY

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Delete Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};