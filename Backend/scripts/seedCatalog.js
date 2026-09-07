import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";

import Category from "../models/categoryModel.js";
import Collection from "../models/collectionModel.js";
import Product from "../models/productModel.js";

dotenv.config();

// CATEGORIES (12)

const categories = [
  [
    "Necklaces",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
  ],
  [
    "Earrings",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
  ],
  [
    "Rings",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
  ],
  [
    "Bracelets",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
  ],
  [
    "Bangles",
    "https://images.unsplash.com/photo-1535556116002-6281ff3e9fcb?w=900&q=80",
  ],
  [
    "Anklets",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
  ],
  [
    "Pendants",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80",
  ],
  [
    "Chains",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=80",
  ],
  [
    "Bridal Jewellery",
    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=80",
  ],
  [
    "Gift Sets",
    "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=900&q=80",
  ],
  [
    "Nose Pins",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
  ],
  [
    "Jewellery Sets",
    "https://images.unsplash.com/photo-1603561596112-db1d0f5b8c6a?w=900&q=80",
  ],
];

// ======================================================
// COLLECTIONS (12)
// ======================================================

const collections = [
  ["Everyday Essentials", "Pieces designed for effortless daily styling."],
  ["Festive Glow", "Bright jewellery for celebrations and special evenings."],
  ["Minimal Muse", "Clean and delicate designs for a modern wardrobe."],
  ["Royal Heritage", "Classic jewellery inspired by timeless Indian craftsmanship."],
  ["Bridal Edit", "Statement pieces curated for your special wedding moments."],
  ["Pearl Stories", "Elegant pearl jewellery with a soft and timeless finish."],
  ["Golden Hour", "Warm gold-toned pieces designed to catch the light."],
  ["Silver Line", "Polished silver styles made for everyday elegance."],
  ["Party Ready", "Bold jewellery pieces for unforgettable evenings."],
  ["Thoughtful Gifting", "Beautiful jewellery selected for meaningful occasions."],
  ["Celestial Dreams", "Star-inspired jewellery with a delicate dreamy aesthetic."],
  ["Modern Luxe", "Contemporary jewellery with a refined luxury feel."],
];

// ======================================================
// PRODUCT NAMES — 4 PER CATEGORY (48 total)
// ======================================================

const productNames = [
  // Necklaces
  ["Pearl Drop Necklace", "Layered Gold Necklace", "Choker Statement Necklace", "Diamond Solitaire Necklace"],
  // Earrings
  ["Crystal Stud Earrings", "Golden Hoop Earrings", "Chandelier Drop Earrings", "Pearl Cluster Earrings"],
  // Rings
  ["Minimal Gold Ring", "Classic Stone Ring", "Twisted Band Ring", "Halo Diamond Ring"],
  // Bracelets
  ["Delicate Charm Bracelet", "Elegant Gold Bracelet", "Tennis Bracelet", "Beaded Stack Bracelet"],
  // Bangles
  ["Classic Gold Bangle", "Diamond Cut Bangle", "Kada Bangle", "Enamel Meenakari Bangle"],
  // Anklets
  ["Silver Anklet", "Pearl Chain Anklet", "Bells Payal Anklet", "Beaded Boho Anklet"],
  // Pendants
  ["Elegant Pearl Pendant", "Heart Gold Pendant", "Initial Letter Pendant", "Om Symbol Pendant"],
  // Chains
  ["Classic Gold Chain", "Slim Designer Chain", "Rope Twist Chain", "Box Link Chain"],
  // Bridal Jewellery
  ["Bridal Kundan Set", "Royal Bridal Necklace", "Bridal Polki Choker", "Temple Bridal Set"],
  // Gift Sets
  ["Jewellery Gift Box", "Elegant Gift Set", "Couple Promise Set", "Mother-Daughter Gift Set"],
  // Nose Pins
  ["Floral Nose Pin", "Classic Gold Nose Pin", "Diamond Stud Nose Pin", "Traditional Nath Nose Ring"],
  // Jewellery Sets
  ["Luxury Jewellery Set", "Classic Pearl Set", "Antique Temple Set", "Contemporary Layered Set"],
];

// ======================================================
// PRODUCT IMAGES (varied pool, cycled per product)
// ======================================================

const productImages = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
  "https://images.unsplash.com/photo-1535556116002-6281ff3e9fcb?w=900&q=80",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=80",
  "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=80",
  "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=900&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80",
  "https://images.unsplash.com/photo-1603561596112-db1d0f5b8c6a?w=900&q=80",
];

// ======================================================
// SLUGIFY
// ======================================================

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ======================================================
// SEED
// ======================================================

const seedCatalog = async () => {
  try {
    await connectDB();

    // ==================================================
    // 1. CREATE / UPDATE CATEGORIES
    // ==================================================

    const categoryMap = [];

    for (const [index, [name, image]] of categories.entries()) {
      const category = await Category.findOneAndUpdate(
        { name },
        {
          $set: {
            image,
            isActive: true,
            sortOrder: index + 1,
          },
          $setOnInsert: {
            products: [],
          },
        },
        { upsert: true, new: true }
      );

      categoryMap.push(category);
    }

    console.log(`✅ ${categoryMap.length} Categories ready`);

    // ==================================================
    // 2. CREATE / UPDATE COLLECTIONS
    // ==================================================

    const collectionMap = [];

    for (const [index, [name, description]] of collections.entries()) {
      const slug = slugify(name);

      const collection = await Collection.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            description,
            image: categories[index % categories.length][1],
            bannerImage: categories[index % categories.length][1],
            isActive: true,
            isFeatured: index < 5,
            sortOrder: index + 1,
          },
          $setOnInsert: {
            products: [],
            startDate: null,
            endDate: null,
          },
        },
        { upsert: true, new: true }
      );

      collectionMap.push(collection);
    }

    console.log(`✅ ${collectionMap.length} Collections ready`);

    // ==================================================
    // 3. CREATE PRODUCTS (4 per category)
    // ==================================================

    const createdProducts = [];
    const PRODUCTS_PER_CATEGORY = 4;

    for (let i = 0; i < categoryMap.length; i++) {
      const category = categoryMap[i];
      const names = productNames[i];

      for (let j = 0; j < PRODUCTS_PER_CATEGORY; j++) {
        const name = names[j];
        const slug = slugify(name);

        const price = 399 + i * 100 + j * 150;
        const basePrice = price + 100;

        // Two different collections per product for variety
        const collection1 = collectionMap[(i + j) % collectionMap.length];
        const collection2 = collectionMap[(i + j + 4) % collectionMap.length];

        const selectedCollections = [collection1._id, collection2._id];

        const product = await Product.findOneAndUpdate(
          { slug },
          {
            $set: {
              name,
              description: `Beautiful ${name.toLowerCase()} designed for an elegant and timeless look.`,
              price,
              basePrice,
              category: category._id,
              collections: selectedCollections,
              brand: "Lumière",
              images: [
                productImages[(i + j) % productImages.length],
                productImages[(i + j + 1) % productImages.length],
                productImages[(i + j + 2) % productImages.length],
              ],
              stock: 10 + i + j,
              isAvailable: true,
              isActive: true,
              isNewArrival: j === 0 || j === 3,
              isBestSeller: (i + j) % 3 === 0,
              color: j % 2 === 0 ? "Gold" : "Rose Gold",
              size: [],
              rating: {
                average: (i + j) % 5 === 0 ? 4.8 : 4.2,
                count: i * 3 + j * 2 + 5,
              },
              soldCount: i * 12 + j * 5,
            },
            $setOnInsert: {
              slug,
            },
          },
          { upsert: true, new: true }
        );

        createdProducts.push(product);

        // Update category
        await Category.findByIdAndUpdate(category._id, {
          $addToSet: { products: product._id },
        });

        // Update collections
        await Collection.updateMany(
          { _id: { $in: selectedCollections } },
          { $addToSet: { products: product._id } }
        );
      }
    }

    // ==================================================
    // 4. CLEAN / SYNC CATEGORY PRODUCTS
    // ==================================================

    for (const category of categoryMap) {
      const products = await Product.find({ category: category._id }).select("_id");

      await Category.findByIdAndUpdate(category._id, {
        $set: { products: products.map((product) => product._id) },
      });
    }

    // ==================================================
    // 5. CLEAN / SYNC COLLECTION PRODUCTS
    // ==================================================

    for (const collection of collectionMap) {
      const products = await Product.find({ collections: collection._id }).select("_id");

      await Collection.findByIdAndUpdate(collection._id, {
        $set: { products: products.map((product) => product._id) },
      });
    }

    // ==================================================
    // FINAL
    // ==================================================

    console.log(`✅ ${createdProducts.length} Products ready`);
    console.log("🎉 Catalog seed complete:");
    console.log(`   Categories: ${categoryMap.length}`);
    console.log(`   Collections: ${collectionMap.length}`);
    console.log(`   Products: ${createdProducts.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Catalog seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedCatalog();