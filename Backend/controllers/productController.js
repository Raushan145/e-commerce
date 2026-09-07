import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Collection from "../models/collectionModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderMOdel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// CREATE PRODUCT

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      basePrice,
      category,
      collections,
      brand,
      stock,
      color,
      size,
      isNewArrival,
      isBestSeller,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price and category are required",
      });
    }

    // =========================
    // CATEGORY CHECK
    // =========================

    const categoryData = await Category.findById(category);

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // =========================
    // SLUG
    // =========================

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    // =========================
    // COLLECTION IDS
    
            
        let collectionIds = [];

        if (collections) {
        if (Array.isArray(collections)) {
            collectionIds = collections;
        } else {
            try {
            const parsed = JSON.parse(collections);

            collectionIds = Array.isArray(parsed)
                ? parsed
                : [parsed];
            } catch {
            collectionIds = [collections];
            }
        }
        }

    // =========================
    // CHECK COLLECTIONS
    // =========================

    if (collectionIds.length > 0) {
      const validCollections = await Collection.find({
        _id: { $in: collectionIds },
      });

      if (validCollections.length !== collectionIds.length) {
        return res.status(400).json({
          success: false,
          message: "One or more collections not found",
        });
      }
    }

    // =========================
    // IMAGES
    // =========================

    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadOnCloudinary(file.path);

        if (imageUrl) {
          images.push(imageUrl);
        }
      }
    }

    // =========================
    // CREATE PRODUCT
    // =========================

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      basePrice: basePrice || null,

      category,

      collections: collectionIds,

      brand: brand || "",

      images,

      stock: Number(stock) || 0,

      color: color || "",

      size:
        typeof size === "string"
          ? JSON.parse(size)
          : size || [],

      isNewArrival:
        isNewArrival === "true" ||
        isNewArrival === true,

      isBestSeller:
        isBestSeller === "true" ||
        isBestSeller === true,

      isAvailable: Number(stock) > 0,

      isActive: true,
    });

    // =========================
    // ADD PRODUCT TO CATEGORY
    // =========================

    await Category.findByIdAndUpdate(category, {
      $addToSet: {
        products: product._id,
      },
    });

    // =========================
    // ADD PRODUCT TO COLLECTIONS
    // =========================

    if (collectionIds.length > 0) {
      await Collection.updateMany(
        {
          _id: { $in: collectionIds },
        },
        {
          $addToSet: {
            products: product._id,
          },
        }
      );
    }

    // =========================
    // POPULATE
    // =========================

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "name image products")
      .populate("collections", "name image products");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// GET ALL PRODUCTS

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name image")
      .populate("collections", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get products",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    // console.log("Api Hit Backend",page,limit)
    const skip = (page - 1) * limit;

    const products = await Product.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({
      isAvailable: true,
    });

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      hasMore: page < totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
};

// Get New Arrival Product

export const getNewArrivals = async (req, res) => {
  try {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const products = await Product.find({
      createdAt: {
        $gte: fifteenDaysAgo,
      },
      isActive: true,
    })
      .populate("category", "name image")
      .populate("collections", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "New arrivals fetched successfully",
      products,
    });
  } catch (error) {
    console.error("New Arrivals Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get new arrivals",
    });
  }
};

// GET PRODUCT BY ID

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("category", "name image")
      .populate("collections", "name image");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get product",
    });
  }
};

// UPDATE PRODUCT

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      basePrice,
      category,
      collections,
      brand,
      stock,
      color,
      size,
      isAvailable,
      isActive,
      isNewArrival,
      isBestSeller,
    } = req.body;

    // =================================================
    // OLD CATEGORY / COLLECTIONS
    // =================================================

    const oldCategoryId = product.category?.toString();

    const oldCollectionIds = product.collections.map((item) =>
      item.toString()
    );

    // =================================================
    // NEW CATEGORY
    // =================================================

    const newCategoryId = category || oldCategoryId;

    const categoryData = await Category.findById(newCategoryId);

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // =================================================
    // NEW COLLECTIONS
    // =================================================

    let newCollectionIds = product.collections;

    if (collections !== undefined) {
      try {
        newCollectionIds =
          typeof collections === "string"
            ? JSON.parse(collections)
            : collections;

        if (!Array.isArray(newCollectionIds)) {
          newCollectionIds = [];
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid collections format",
        });
      }
    }

    // =================================================
    // IMAGES
    // =================================================

    let images = product.images;

    if (req.files && req.files.length > 0) {
      const newImages = [];

      for (const file of req.files) {
        const imageUrl = await uploadOnCloudinary(file.path);

        if (imageUrl) {
          newImages.push(imageUrl);
        }
      }

      if (newImages.length > 0) {
        images = newImages;
      }
    }

    // =================================================
    // SLUG
    // =================================================

    let slug = product.slug;

    if (name) {
      slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const slugExists = await Product.findOne({
        slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists",
        });
      }
    }

    // =================================================
    // UPDATE PRODUCT
    // =================================================

    product.name = name ?? product.name;
    product.slug = slug;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.basePrice = basePrice ?? product.basePrice;

    product.category = newCategoryId;
    product.collections = newCollectionIds;

    product.brand = brand ?? product.brand;
    product.images = images;
    product.stock = stock ?? product.stock;
    product.color = color ?? product.color;

    product.size =
      size !== undefined
        ? typeof size === "string"
          ? JSON.parse(size)
          : size
        : product.size;

    product.isAvailable =
      isAvailable !== undefined
        ? isAvailable === "true" || isAvailable === true
        : product.isAvailable;

    product.isActive =
      isActive !== undefined
        ? isActive === "true" || isActive === true
        : product.isActive;

    product.isNewArrival =
      isNewArrival !== undefined
        ? isNewArrival === "true" || isNewArrival === true
        : product.isNewArrival;

    product.isBestSeller =
      isBestSeller !== undefined
        ? isBestSeller === "true" || isBestSeller === true
        : product.isBestSeller;

    await product.save();

    // =================================================
    // CATEGORY CHANGE
    // =================================================

    if (oldCategoryId !== newCategoryId.toString()) {
      // Remove from old category
      await Category.findByIdAndUpdate(oldCategoryId, {
        $pull: {
          products: product._id,
        },
      });

      // Add to new category
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: {
          products: product._id,
        },
      });
    }

    // =================================================
    // COLLECTION CHANGE
    // =================================================

    const newCollectionIdStrings = newCollectionIds.map((item) =>
      item.toString()
    );

    // Remove from old collections
    const removedCollections = oldCollectionIds.filter(
      (item) => !newCollectionIdStrings.includes(item)
    );

    if (removedCollections.length > 0) {
      await Collection.updateMany(
        {
          _id: { $in: removedCollections },
        },
        {
          $pull: {
            products: product._id,
          },
        }
      );
    }

    // Add to new collections
    if (newCollectionIdStrings.length > 0) {
      await Collection.updateMany(
        {
          _id: { $in: newCollectionIdStrings },
        },
        {
          $addToSet: {
            products: product._id,
          },
        }
      );
    }

    // =================================================
    // POPULATE
    // =================================================

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "name image")
      .populate("collections", "name image");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

// DELETE PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =================================================
    // REMOVE FROM CATEGORY
    // =================================================

    await Category.findByIdAndUpdate(product.category, {
      $pull: {
        products: product._id,
      },
    });

    // =================================================
    // REMOVE FROM COLLECTIONS
    // =================================================

    if (product.collections.length > 0) {
      await Collection.updateMany(
        {
          _id: {
            $in: product.collections,
          },
        },
        {
          $pull: {
            products: product._id,
          },
        }
      );
    }

    // =================================================
    // DELETE PRODUCT
    // =================================================

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};

// ADD RECENTLY VIEWED PRODUCT

export const addRecentlyViewed = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove existing product
    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.product.toString() !== productId
    );

    // Add product at beginning
    user.recentlyViewed.unshift({
      product: productId,
      viewedAt: new Date(),
    });

    // Keep only last 20
    user.recentlyViewed = user.recentlyViewed.slice(0, 20);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Recently viewed updated",
    });

  } catch (error) {
    console.error("Recently Viewed Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// JUST FOR YOU

export const getJustForYou = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await User.findById(userId)
      .populate({
        path: "recentlyViewed.product",
        populate: [
          {
            path: "category",
            select: "name",
          },
          {
            path: "collections",
            select: "name",
          },
        ],
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // RECENTLY VIEWED

    const viewedProducts = user.recentlyViewed
      .map((item) => item.product)
      .filter(Boolean);

    const viewedProductIds = viewedProducts.map(
      (product) => product._id
    );

    // CATEGORY IDS

    const categoryIds = [
      ...new Set(
        viewedProducts
          .map((product) => product.category?._id?.toString())
          .filter(Boolean)
      ),
    ];

    // COLLECTION IDS

    const collectionIds = [
      ...new Set(
        viewedProducts
          .flatMap((product) =>
            product.collections?.map((collection) =>
              collection._id.toString()
            ) || []
          )
      ),
    ];

    // PURCHASED PRODUCTS

    const orders = await Order.find({ user: userId }).select("items");

    const purchasedProductIds = [];

    orders.forEach((order) => {
      order.items?.forEach((orderItem) => {
        if (orderItem.product) {
          purchasedProductIds.push(orderItem.product.toString());
        }
      });
    });

    // REMOVE DUPLICATES

    const purchasedSet = new Set(
      purchasedProductIds
    );

    const viewedSet = new Set(
      viewedProductIds.map((id) => id.toString())
    );

    // FIND SIMILAR PRODUCTS

    let recommendations = [];

    if (
      categoryIds.length > 0 ||
      collectionIds.length > 0
    ) {

      recommendations = await Product.find({
        isActive: true,
        isAvailable: true,

        _id: {
          $nin: [
            ...viewedProductIds,
            ...purchasedProductIds,
          ],
        },

        $or: [
          {
            category: {
              $in: categoryIds,
            },
          },
          {
            collections: {
              $in: collectionIds,
            },
          },
        ],
      })
        .populate("category", "name image")
        .populate("collections", "name image")
        .sort({
          soldCount: -1,
          "rating.average": -1,
        })
        .limit(20);
    }

    // FALLBACK BEST SELLERS

    if (recommendations.length < 10) {

      const recommendationIds = recommendations.map(
        (product) => product._id
      );

      const excludeIds = [
        ...viewedProductIds,
        ...purchasedProductIds,
        ...recommendationIds,
      ];

      const fallbackProducts = await Product.find({
        isActive: true,
        isAvailable: true,

        _id: {
          $nin: excludeIds,
        },
      })
        .populate("category", "name image")
        .populate("collections", "name image")
        .sort({
          soldCount: -1,
          "rating.average": -1,
        })
        .limit(10);

      recommendations = [
        ...recommendations,
        ...fallbackProducts,
      ];
    }

    // FINAL LIMIT

    recommendations = recommendations.slice(0, 20);

    return res.status(200).json({
      success: true,
      message: "Just For You products fetched successfully",
      products: recommendations,
      recentlyViewed: viewedProducts,
    });

  } catch (error) {

    console.error("Just For You Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get recommendations",
    });
  }
};

// GET PRODUCTS BY CATEGORY

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // CATEGORY CHECK
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // PRODUCTS
    const products = await Product.find({
      category: categoryId,
      isActive: true,
      isAvailable: true,
    })
      .populate("category", "name image")
      .populate("collections", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      category,
      products,
    });
  } catch (error) {
    console.error("Get Products By Category Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get category products",
    });
  }
};

// GET PRODUCTS BY COLLECTION
export const getProductsByCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    const products = await Product.find({
      collections: collectionId,
      isActive: true,
      isAvailable: true,
    })
      .populate("category", "name image")
      .populate("collections", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Collection products fetched successfully",
      collection,
      products,
    });
  } catch (error) {
    console.error("Get Products By Collection Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get collection products",
    });
  }
};