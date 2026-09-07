import Banner from "../models/bannerModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// CREATE BANNER

export const createBanner = async (req, res) => {
  try {
    const {
      tag,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      sortOrder,
      isActive,
    } = req.body;

    // if (!title || !subtitle) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Title and subtitle are required",
    //   });
    // }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

    const image = await uploadOnCloudinary(
      req.file.path,
      "ecom/banners"
    );

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Banner image upload failed",
      });
    }

    const banner = await Banner.create({
      tag: tag || "",
      title: title || "",
      subtitle: subtitle || "",
      description: description || "",
      image,
      buttonText: buttonText || "SHOP NOW",
      buttonLink: buttonLink || "/products",
      sortOrder: Number(sortOrder) || 0,
      isActive:
        isActive === "false"
          ? false
          : isActive === false
            ? false
            : true,
    });

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    console.error("Create Banner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create banner",
    });
  }
};

// GET ALL BANNERS - ADMIN

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find()
      .sort({ sortOrder: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("Get All Banners Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get banners",
    });
  }
};

// GET ACTIVE BANNERS - USER

export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({
      isActive: true,
    }).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("Get Active Banners Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get active banners",
    });
  }
};

// GET BANNER BY ID

export const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error("Get Banner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get banner",
    });
  }
};

// UPDATE BANNER

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const {
      tag,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      sortOrder,
      isActive,
    } = req.body;

    let image = banner.image;

    if (req.file) {
      const newImage = await uploadOnCloudinary(
        req.file.path,
        "ecom/banners"
      );

      if (newImage) {
        image = newImage;
      }
    }

    banner.tag = tag ?? banner.tag;
    banner.title = title ?? banner.title;
    banner.subtitle = subtitle ?? banner.subtitle;
    banner.description = description ?? banner.description;
    banner.image = image;
    banner.buttonText = buttonText ?? banner.buttonText;
    banner.buttonLink = buttonLink ?? banner.buttonLink;

    if (sortOrder !== undefined) {
      banner.sortOrder = Number(sortOrder);
    }

    if (isActive !== undefined) {
      banner.isActive =
        isActive === "true" || isActive === true;
    }

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    console.error("Update Banner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update banner",
    });
  }
};

// TOGGLE ACTIVE

export const toggleBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;

    await banner.save();

    return res.status(200).json({
      success: true,
      message: `Banner ${
        banner.isActive ? "activated" : "deactivated"
      } successfully`,
      banner,
    });
  } catch (error) {
    console.error("Toggle Banner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update banner status",
    });
  }
};

// ==========================================
// DELETE BANNER
// ==========================================

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Delete Banner Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete banner",
    });
  }
};