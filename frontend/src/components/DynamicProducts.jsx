import { useEffect } from "react";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import ProductCard from "./ProductCard";

import {
  getProductsByCategoryThunk,
  getProductsByCollectionThunk,
  getNewArrivalProductThunk,
} from "../redux/Product/productThunk";

const DynamicProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { categoryId, collectionId } = useParams();

  const {category, collection, products = [], loading, error,} = useSelector((state) => state.product);

  // =========================================================
  // PAGE TYPE
  // =========================================================

  const isCategoryPage = location.pathname.startsWith("/category/");
  const isCollectionPage = location.pathname.startsWith("/collection/");
  const isNewArrivalPage = location.pathname === "/new-arrivals";
  const isRecentlyViewedPage =
    location.pathname === "/recently-viewed";

  // =========================================================
  // FETCH PRODUCTS
  // =========================================================

  useEffect(() => {
    if (isCategoryPage && categoryId) {
      dispatch(getProductsByCategoryThunk(categoryId));
      return;
    }

    if (isCollectionPage && collectionId) {
      dispatch(getProductsByCollectionThunk(collectionId));
      return;
    }

    if (isNewArrivalPage) {
      dispatch(getNewArrivalProductThunk());
      return;
    }

    // if (isRecentlyViewedPage) {
    //   dispatch(getRecentlyViewedProductsThunk());
    // }
  }, [
    dispatch,
    isCategoryPage,
    isCollectionPage,
    isNewArrivalPage,

    categoryId,
    collectionId,
  ]);

  // =========================================================
  // DYNAMIC TITLE
  // =========================================================

  const getTitle = () => {
    if (isCategoryPage) {
      return category?.name || "Category";
    }

    if (isCollectionPage) {
      return collection?.name || "Collection";
    }

    if (isNewArrivalPage) {
      return "New Arrivals";
    }

    if (isRecentlyViewedPage) {
      return "Recently Viewed";
    }

    return "Products";
  };

  const title = getTitle();

  // =========================================================
  // DYNAMIC SUBTITLE
  // =========================================================

  const getDescription = () => {
    if (isCategoryPage) {
      return `Explore our latest ${title.toLowerCase()} collection.`;
    }

    if (isCollectionPage) {
      return `Explore products carefully curated for the ${title} collection.`;
    }

    if (isNewArrivalPage) {
      return "Discover the latest styles and fresh additions to our store.";
    }

    if (isRecentlyViewedPage) {
      return "Pick up where you left off and rediscover products you viewed recently.";
    }

    return "Explore our latest products.";
  };

  const description = getDescription();

  // =========================================================
  // TOP LABEL
  // =========================================================

  const getTopLabel = () => {
    if (isCategoryPage) return "Shop by Category";
    if (isCollectionPage) return "Explore Collection";
    if (isNewArrivalPage) return "Fresh Arrivals";
    if (isRecentlyViewedPage) return "Your Browsing";
    return "Explore";
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffdf8] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">

          {/* HEADER SKELETON */}

          <div className="animate-pulse">
            <div className="h-2.5 w-24 rounded bg-gray-200" />

            <div className="mt-3 h-9 w-52 rounded-lg bg-gray-200" />

            <div className="mt-3 h-3 w-80 max-w-full rounded bg-gray-100" />
          </div>

          {/* PRODUCTS SKELETON */}

          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[4/5] rounded-2xl bg-gray-100" />

                <div className="mt-3 h-3 w-3/4 rounded bg-gray-100" />

                <div className="mt-2 h-3 w-1/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#fffdf8] px-4">
        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-400">
            <FiPackage size={22} />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-gray-700">
            Something went wrong
          </h2>

          <p className="mt-2 max-w-sm text-[10px] leading-5 text-gray-400">
            {error}
          </p>

        </div>
      </main>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-[#fffdf8]">

      <div className="mx-auto w-full max-w-[1400px] px-4 py-3 sm:px-6 sm:py-3 lg:px-10 lg:py-3">

        {/* HEADER */}

        <div className=" border-b border-gray-100 pb-2">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            {/* LEFT */}

            <div>

              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-gray-400">
                {getTopLabel()}
              </p>

              <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#293b25] sm:text-4xl">
                {title}
              </h1>

              <p className="mt-2 max-w-xl text-[10px] leading-5 text-gray-400 sm:text-xs">
                {description}
              </p>

            </div>

            {/* PRODUCT COUNT */}

            <div className="flex shrink-0 items-center gap-2 text-[9px] text-gray-400">

              <FiPackage size={13} />

              <span>
                {products.length}{" "}
                {products.length === 1
                  ? "Product"
                  : "Products"}
              </span>

            </div>

          </div>

        </div>

        {/* PRODUCTS */}

        {products.length === 0 ? (

          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-300 shadow-sm ring-1 ring-gray-100">
              <FiPackage size={24} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-gray-700">
              No products found
            </h3>

            <p className="mt-2 max-w-sm text-[10px] leading-5 text-gray-400">
              There are currently no products available in this section.
            </p>

          </div>

        ) : (

          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-12">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </main>
  );
};

export default DynamicProducts;