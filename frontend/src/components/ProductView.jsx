import React, { useEffect, useMemo, useState } from "react";
import {
  FiHeart,
  FiShare2,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addRecentlyViewedThunk,
  getProductByIdThunk,
} from "../redux/Product/productThunk";
import { addToCart, toggleWishlist, updateCartQuantity } from "../redux/Cart/cartSlice";
import { saveRecentlyViewed } from "../utils/recentlyViewed";

const ProductView = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedProduct: product, loading } = useSelector(
    (state) => state.product,
  );

  const { wishListItem = [] } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
   const isCart = cartItems.find(i => i._id == product?._id) 
   console.log(isCart)
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(isCart?.quantity );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(isCart == "undefined" ? false : true)

  // GET PRODUCT

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdThunk(id));
      dispatch(addRecentlyViewedThunk(id));
    }
  }, [id, dispatch]);

  // RESET IMAGE WHEN PRODUCT CHANGES

  useEffect(() => {
    if (product?._id) {
      saveRecentlyViewed(product);
    }
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(isCart?.quantity);
  }, [product?._id, isCart]);

  // =====================================================
  // WISHLIST CHECK
  // =====================================================

  useEffect(() => {
    if (product?._id) {
      const exists = wishListItem?.some((item) => item._id === product._id);

      setIsWishlisted(exists);
    }
  }, [product?._id, wishListItem]);

  // DISCOUNT

  const discount = useMemo(() => {
    if (!product?.basePrice || product.basePrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.basePrice - product.price) / product.basePrice) * 100,
    );
  }, [product]);

  // IMAGE

  const images = product?.images || [];

  const currentImage = images[selectedImage] || images[0];
  // QUANTITY

  const increaseQuantity = () => {
    dispatch(updateCartQuantity({ id: isCart._id, quantity: isCart.quantity + 1,}));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
         dispatch(updateCartQuantity({ id: isCart._id, quantity: isCart.quantity - 1,}));
    }
  };

  // ADD CART

  const handleAddToCart = () => {
    if (!product?.isAvailable || product.stock <= 0) {
      return;
    }
    if(!isInCart){
        dispatch(addToCart({...product,quantity, }),);
    }else{
        navigate("/cart")
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    if (!product?.isAvailable || product.stock <= 0) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
      }),
    );

    navigate("/cart");
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  // =====================================================
  // SHARE
  // =====================================================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert("Product link copied!");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#293b25]" />

          <p className="mt-3 text-xs text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">Product not found</p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-4 rounded-lg bg-[#293b25] px-5 py-2.5 text-xs text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock =
    !product.isAvailable || product.stock <= 0 || !product.isActive;

  return (
    <div className="min-h-screen bg-[#fcfcfa]">
      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

      {/* <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#293b25]"
          >
            Home
          </button>

          <span>/</span>

          <button
            onClick={() => navigate("/shop")}
            className="hover:text-[#293b25]"
          >
            Shop
          </button>

          {product.category?.name && (
            <>
              <span>/</span>

              <span className="text-gray-500">{product.category.name}</span>
            </>
          )}

          <span>/</span>

          <span className="max-w-[150px] truncate text-gray-600">
            {product.name}
          </span>
        </div>
      </div> */}

      {/* ================================================= */}
      {/* PRODUCT */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-8 lg:px-8 ">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ================================================= */}
          {/* LEFT - IMAGE */}
          {/*  PRODUCT IMAGE GALLERY  */}

          <div className="w-full">
            {/* ======================================================= */}
            {/* DESKTOP / LARGE SCREEN */}
            {/* ======================================================= */}

            <div className="hidden  md:grid md:grid-cols-[88px_minmax(0,1fr)] md:gap-4">
              {/* THUMBNAILS - LEFT */}
              <div
                className="
                    flex
                    max-h-[400px]
                    flex-col
                    gap-3
                    overflow-y-auto
                    pr-1
                    scrollbar-none
                "
                >
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`
            group
            relative
            h-[100px]
            w-[90px]
            shrink-0
            overflow-hidden
            rounded-xl
            border
            bg-white
            transition-all
            duration-200
            ${
              selectedImage === index
                ? "border-[#293b25] ring-1 ring-[#293b25]"
                : "border-gray-200 hover:border-gray-400"
            }
          `}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
                    />

                    {/* ACTIVE OVERLAY */}
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-[#293b25]/5" />
                    )}
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
        relative
        min-w-0
        overflow-hidden
        rounded-2xl
        bg-[#f5f3ef]
      "
              >
                <div className="h-[400px]  w-full">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="
              h-full
              w-full
              object-cover
              transition-opacity
              duration-300
            "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* BADGES */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <span
                      className="
              rounded-full
              bg-white/95
              px-3
              py-1.5
              text-[9px]
              font-medium
              text-[#293b25]
              shadow-sm
              backdrop-blur
            "
                    >
                      New Arrival
                    </span>
                  )}

                  {product.isBestSeller && (
                    <span
                      className="
              rounded-full
              bg-[#293b25]
              px-3
              py-1.5
              text-[9px]
              font-medium
              text-white
              shadow-sm
            "
                    >
                      Best Seller
                    </span>
                  )}
                </div>

                {/* DISCOUNT */}
                {discount > 0 && (
                  <div className="absolute right-4 top-4">
                    <span
                      className="
              rounded-full
              bg-white
              px-3
              py-1.5
              text-[9px]
              font-semibold
              text-red-500
              shadow-sm
            "
                    >
                      {discount}% OFF
                    </span>
                  </div>
                )}

                {/* IMAGE COUNTER */}
                {images.length > 1 && (
                  <div
                    className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-black/50
            px-3
            py-1
            text-[8px]
            font-medium
            text-white
            backdrop-blur
          "
                  >
                    {selectedImage + 1} / {images.length}
                  </div>
                )}

                {/* LEFT ARROW */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="
            absolute
            left-4
            top-1/2
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-700
            shadow-md
            backdrop-blur
            transition
            hover:bg-white
          "
                  >
                    <FiChevronLeft size={17} />
                  </button>
                )}

                {/* RIGHT ARROW */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="
            absolute
            right-4
            top-1/2
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-700
            shadow-md
            backdrop-blur
            transition
            hover:bg-white
          "
                  >
                    <FiChevronRight size={17} />
                  </button>
                )}
              </div>
            </div>

            {/* ======================================================= */}
            {/* MOBILE / TABLET */}
            {/* ======================================================= */}

            <div className="md:hidden">
              {/* MAIN IMAGE */}
              <div
                className="
        relative
        overflow-hidden
        rounded-2xl
        bg-[#f5f3ef]
      "
              >
                <div className="h-[300px] w-full">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="
              h-full
              w-full
              object-cover
            "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* BADGES */}
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  {product.isNewArrival && (
                    <span
                      className="
              rounded-full
              bg-white/95
              px-2.5
              py-1.5
              text-[8px]
              font-medium
              text-[#293b25]
              shadow-sm
              backdrop-blur
            "
                    >
                      New Arrival
                    </span>
                  )}

                  {product.isBestSeller && (
                    <span
                      className="
              rounded-full
              bg-[#293b25]
              px-2.5
              py-1.5
              text-[8px]
              font-medium
              text-white
              shadow-sm
            "
                    >
                      Best Seller
                    </span>
                  )}
                </div>

                {/* DISCOUNT */}
                {discount > 0 && (
                  <div className="absolute right-3 top-3">
                    <span
                      className="
                     -right-10 absolute top-2 z-10 w-32 rotate-45 bg-rose-500 py-1 text-center text-sm font-bold text-white shadow-md 
             
            "
                    >
                      {discount}% OFF
                    </span>
                  </div>
                )}

                {/* IMAGE COUNTER */}
                {images.length > 1 && (
                  <div
                    className="
            absolute
            bottom-3
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-black/50
            px-3
            py-1
            text-[8px]
            text-white
            backdrop-blur
          "
                  >
                    {selectedImage + 1} / {images.length}
                  </div>
                )}

                {/* LEFT */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="
            absolute
            left-3
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-700
            shadow-md
          "
                  >
                    <FiChevronLeft size={16} />
                  </button>
                )}

                {/* RIGHT */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="
            absolute
            right-3
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-700
            shadow-md
          "
                  >
                    <FiChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* ===================================================== */}
              {/* MOBILE THUMBNAILS */}
              {/* ===================================================== */}

              <div
                className="
        mt-3
        flex
        w-full
        gap-2.5
        overflow-x-auto
        pb-1
        scrollbar-hide
      "
              >
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`
            relative
            h-[76px]
            w-[62px]
            shrink-0
            overflow-hidden
            rounded-lg
            border
            bg-white
            transition-all
            duration-200
            ${
              selectedImage === index
                ? "border-[#293b25] ring-1 ring-[#293b25]"
                : "border-gray-200"
            }
          `}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-[#293b25]/5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT - PRODUCT INFO */}
          {/* ================================================= */}

          <div className="flex flex-col">
            {/* BRAND */}

            {product.brand && (
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                {product.brand}
              </p>
            )}

            {/* NAME */}

            <div className="mt-2 flex items-start justify-between gap-4">
              <h1 className="max-w-xl text-2xl font-semibold leading-tight text-[#293b25] sm:text-3xl lg:text-[34px]">
                {product.name}
              </h1>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={handleWishlist}
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition
                    ${
                      isWishlisted
                        ? "border-red-100 bg-red-50 text-red-500"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }
                  `}
                >
                  <FiHeart
                    size={17}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-500
                    transition
                    hover:border-gray-300
                    hover:text-[#293b25]
                  "
                >
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>

            {/* RATING */}

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <FaStar size={13} className="text-yellow-500" />

                <span className="text-xs font-semibold text-gray-700">
                  {product.rating?.average
                    ? product.rating.average.toFixed(1)
                    : "0.0"}
                </span>
              </div>

              <span className="h-3 w-px bg-gray-200" />

              <span className="text-[10px] text-gray-400">
                {product.rating?.count || 0} reviews
              </span>

              {product.soldCount > 0 && (
                <>
                  <span className="h-3 w-px bg-gray-200" />

                  <span className="text-[10px] text-gray-400">
                    {product.soldCount} sold
                  </span>
                </>
              )}
            </div>

            {/* PRICE */}

            <div className="mt-3 flex items-end gap-3">
              <span className="text-2xl font-semibold text-[#293b25]">
                ₹{product.price}
              </span>

              {product.basePrice && product.basePrice > product.price && (
                <span className="mb-0.5 text-sm text-gray-400 line-through">
                  ₹{product.basePrice}
                </span>
              )}

              {discount > 0 && (
                <span className="mb-0.5 text-[10px] font-semibold text-green-600">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* DIVIDER */}

            {/* <div className="my-6 h-px bg-gray-100" /> */}

            {/* DESCRIPTION */}

            <div>
              <h2 className="text-xs mt-3 font-semibold text-gray-800">
                Product Details
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-6 text-gray-500">
                {product.description}
              </p>
            </div>

            {/* CATEGORY */}

            {product.category?.name && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-[10px] text-gray-400">Category</span>

                <button
                  onClick={() => navigate(`/category/${product.category._id}`)}
                  className="
                    rounded-full
                    bg-[#f2f3ee]
                    px-3
                    py-1
                    text-[9px]
                    font-medium
                    text-[#293b25]
                    hover:bg-[#e8ebe3]
                  "
                >
                  {product.category.name}
                </button>
              </div>
            )}

            {/* COLLECTIONS */}

            {product.collections?.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10px] text-gray-400">
                  Collection
                </span>

                {product.collections.map((collection) => (
                  <button
                    key={collection._id}
                    onClick={() => navigate(`/collection/${collection._id}`)}
                    className="
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        px-3
                        py-1.5
                        text-[9px]
                        text-gray-600
                        transition
                        hover:border-[#293b25]
                        hover:text-[#293b25]
                      "
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            )}

            {/* COLOR */}

            {product.color && (
              <div className="mt-3">
                <span className="text-[10px] text-gray-400">Color</span>

                <p className="mt-1 text-xs font-medium text-gray-700">
                  {product.color}
                </p>
              </div>
            )}

            {/* SIZE */}

            {product.size?.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-gray-600">
                    Select Size
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      className="
                        min-w-10
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-3
                        py-2
                        text-[10px]
                        text-gray-600
                        transition
                        hover:border-[#293b25]
                        hover:text-[#293b25]
                      "
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STOCK */}

            <div className="mt-2">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 text-xs font-medium text-red-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Out of stock
                </div>
              ) : product.stock <= 5 ? (
                <div className="flex items-center gap-2 text-[10px] font-medium text-orange-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Only {product.stock} left in stock
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[10px] font-medium text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  In stock
                </div>
              )}
            </div>

            {/* QUANTITY + CART */}

            {!isOutOfStock && (
              <div className="mt-3 flex gap-3">
                {/* QUANTITY */}

                <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-white">
                  <button
                    onClick={decreaseQuantity}

                    className="
                      flex
                      h-full
                      w-10
                      items-center
                      justify-center
                      text-gray-500
                      disabled:opacity-30
                    "
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="w-8 text-center text-xs font-medium text-gray-700">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="
                      flex
                      h-full
                      w-10
                      items-center
                      justify-center
                      text-gray-500
                      disabled:opacity-30
                    "
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                {/* ADD TO CART */}

                <button
                  onClick={() => {
                    handleAddToCart()
                    setIsInCart(true)
                }}
                  className="
                    flex
                    h-12
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#293b25]
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-[#1f2e1c]
                  "
                >   
                  {isInCart != "undefined" ? <IoCartOutline size={17}/> : <FiShoppingBag size={17} />}
                  {isInCart != "undefined" ? "View in Cart" :" Add to Bag"}
                </button>
              </div>
            )}

            {/* BUY NOW */}

            {!isOutOfStock && (
              <button
                onClick={handleBuyNow}
                className="
                  mt-3
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#293b25]
                  bg-white
                  text-xs
                  font-medium
                  text-[#293b25]
                  transition
                  hover:bg-[#f4f6f1]
                "
              >
                Buy Now
              </button>
            )}

            {/* ================================================= */}
            {/* BENEFITS */}
            {/* ================================================= */}

            <div className="mt-7 grid grid-cols-3 border-y border-gray-100 py-5">
              <div className="flex flex-col items-center text-center">
                <FiTruck size={17} className="text-[#293b25]" />

                <p className="mt-2 text-[9px] font-medium text-gray-600">
                  Fast Delivery
                </p>

                <p className="mt-0.5 text-[8px] text-gray-400">Across India</p>
              </div>

              <div className="border-x border-gray-100 flex flex-col items-center text-center">
                <FiShield size={17} className="text-[#293b25]" />

                <p className="mt-2 text-[9px] font-medium text-gray-600">
                  Secure Payment
                </p>

                <p className="mt-0.5 text-[8px] text-gray-400">100% secure</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <FiRotateCcw size={17} className="text-[#293b25]" />

                <p className="mt-2 text-[9px] font-medium text-gray-600">
                  Easy Returns
                </p>

                <p className="mt-0.5 text-[8px] text-gray-400">Hassle free</p>
              </div>
            </div>

            {/* ACTIVE CHECK */}

            {product.isActive && (
              <div className="mt-4 flex items-center gap-2">
                <FiCheck size={13} className="text-green-500" />

                <span className="text-[9px] text-gray-400">
                  This product is currently available
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductView;
