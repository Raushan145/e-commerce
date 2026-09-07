import React from "react";
import {
  FiHeart,
  FiStar,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  updateCartQuantity,
  toggleWishlist,
} from "../redux/Cart/cartSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ==========================================
  // CART
  // ==========================================

  const { cartItems , wishListItem = [] } = useSelector(
    (state) => state.cart
  );

  const isCart = cartItems.find(
    (item) => item._id === product?._id
  );

  const quantity = isCart?.quantity || 0;

  const isInCart = !!isCart;

  // ==========================================
  // WISHLIST
  // ==========================================

  const isWishlisted = wishListItem?.some(
    (item) => item._id === product?._id
  );

  // ==========================================
  // PRODUCT DATA
  // ==========================================

  const image = product?.images?.[0] || product?.image;

  const price = product?.price || 0;

  const oldPrice = product?.basePrice || price;

  const rating =
    product?.rating?.average ?? product?.rating ?? 0;

  const reviews =
    product?.rating?.count ?? product?.reviews ?? 0;

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  // ==========================================
  // OPEN PRODUCT
  // ==========================================

  const openProduct = () => {
    navigate(`/product/${product._id}`);
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (event) => {
    event.stopPropagation();

    if (
      !product?.isAvailable ||
      product?.stock <= 0
    ) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  // INCREASE

  const increaseQuantity = (event) => {
    event.stopPropagation();

    if (!isCart) return;

    if (isCart.quantity >= product.stock) {
      return;
    }

    dispatch(
      updateCartQuantity({
        id: product._id,
        quantity: isCart.quantity + 1,
      })
    );
  };

  // ==========================================
  // DECREASE
  // ==========================================

  const decreaseQuantity = (event) => {
    event.stopPropagation();

    if (!isCart) return;

    if (isCart.quantity <= 1) {
      dispatch(
        updateCartQuantity({
          id: product._id,
          quantity: 0,
        })
      );

      return;
    }

    dispatch(
      updateCartQuantity({
        id: product._id,
        quantity: isCart.quantity - 1,
      })
    );
  };

  // ==========================================
  // VIEW CART
  // ==========================================

  const handleViewCart = (event) => {
    event.stopPropagation();

    navigate("/cart");
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = (event) => {
    event.stopPropagation();

    dispatch(toggleWishlist(product));
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <article  className=" 
        group 
        relative 
        shrink-0 
        w-[170px] 
        sm:w-[170px] 
        md:w-[200px] 
        lg:w-[220px] 
        rounded-md 
        border 
        border-[#eee8dc] 
        bg-[#fffdfa] 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-md 
      "
    >
      {/* =====================================
          IMAGE
      ====================================== */}

      <div
        onClick={openProduct}
        className="
           relative 
          md:h-[200px] 
          h-[160px] 
          bg-[#f7f1e7] 
          overflow-hidden 
        "
      >
        {/* Product Image */}

        {image ? (
          <img
            src={image}
            alt={product?.name || "Product"}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.045]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-xs
              text-gray-400
            "
          >
            No Image
          </div>
        )}

        {/* Soft Overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* =================================
            BADGES
        ================================== */}

        <div
          className="
            absolute
            left-2.5
            top-2.5
            flex
            flex-col
            gap-1.5
            sm:left-3
            sm:top-3
          "
        >
          {discount > 0 && (
            <span
              className="
                rounded-full
                bg-[#293b25]
                px-2.5
                py-1.5
                text-[7px]
                font-semibold
                tracking-[0.08em]
                text-white
                shadow-sm
                sm:px-3
                sm:text-[8px]
              "
            >
              {discount}% OFF
            </span>
          )}

          {product?.isNewArrival && (
            <span
              className="
                rounded-full
                bg-white/95
                px-2.5
                py-1.5
                text-[7px]
                font-medium
                tracking-[0.06em]
                text-[#293b25]
                shadow-sm
                backdrop-blur
                sm:px-3
                sm:text-[8px]
              "
            >
              NEW
            </span>
          )}
        </div>

        {/* =================================
            WISHLIST
        ================================== */}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={handleWishlist}
          className="
            absolute
            right-2.5
            top-2.5
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/70
            bg-white/90
            text-gray-500
            shadow-sm
            backdrop-blur
            transition-all
            duration-200
            hover:scale-105
            hover:text-[#293b25]
            sm:right-3
            sm:top-3
            sm:h-9
            sm:w-9
          "
        >
          <FiHeart
            size={14}
            className={
              isWishlisted
                ? "fill-[#293b25] text-[#293b25]"
                : ""
            }
          />
        </button>
      </div>

      {/* =====================================
          DETAILS
      ====================================== */}

      <div className="p-3 sm:p-4">

        {/* Category */}

        <p
          className="
            truncate
            text-[7px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-gray-400
            sm:text-[8px]
          "
        >
          {product?.brand ||
            product?.category?.name ||
            "Jewellery"}
        </p>

        {/* Product Name */}

        <h3
          onClick={openProduct}
          title={product?.name}
          className="
            mt-1.5
            cursor-pointer
            truncate
            text-[11px]
            font-medium
            tracking-tight
            text-[#292d23]
            transition-colors
            hover:text-[#293b25]
            sm:text-sm
          "
        >
          {product?.name}
        </h3>

        {/* =================================
            RATING
        ================================== */}

        <div className="mt-2 flex items-center gap-1.5">

          <div
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-[#f6f1e7]
              px-1.5
              py-0.5
            "
          >
            <FiStar
              size={9}
              className="
                fill-[#b28a43]
                text-[#b28a43]
              "
            />

            <span
              className="
                text-[8px]
                font-medium
                text-[#4b4b43]
                sm:text-[9px]
              "
            >
              {Number(rating).toFixed(1)}
            </span>
          </div>

          <span
            className="
              text-[8px]
              text-gray-400
              sm:text-[9px]
            "
          >
            {reviews} reviews
          </span>
        </div>

        {/* =================================
            PRICE
        ================================== */}

        <div className="mt-2 flex items-center gap-2">

          <span
            className="
              text-xs
              font-semibold
              tracking-tight
              text-[#293b25]
              sm:text-sm
            "
          >
            ₹{price.toLocaleString("en-IN")}
          </span>

          {oldPrice > price && (
            <span
              className="
                text-[8px]
                text-gray-400
                line-through
                sm:text-[10px]
              "
            >
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* =================================
            CART AREA
        ================================== */}

        {!isInCart ? (
          /* ADD TO CART */

          <button
            type="button"
            disabled={
              !product?.isAvailable ||
              product?.stock <= 0
            }
            onClick={handleAddToCart}
            className="
              mt-3
              flex
              h-9
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#293b25]
              bg-[#293b25]
              text-[8px]
              font-semibold
              tracking-[0.12em]
              text-white
              transition-all
              duration-300
              hover:bg-[#1f2e1c]
              disabled:cursor-not-allowed
              disabled:border-gray-200
              disabled:bg-gray-100
              disabled:text-gray-400
              sm:h-10
              sm:text-[9px]
            "
          >
            <FiShoppingCart size={13} />

            {product?.stock > 0 &&
            product?.isAvailable
              ? "ADD TO CART"
              : "OUT OF STOCK"}
          </button>
        ) : (
          /* CART CONTROLS */

          <div className="mt-3 flex gap-2">

            {/* Quantity */}

            <div
              className="
                flex
                h-9
                flex-1
                items-center
                justify-between
                overflow-hidden
                rounded-xl
                border
                border-[#ddd8cc]
                bg-[#faf8f3]
                sm:h-10
              "
            >
              <button
                type="button"
                onClick={decreaseQuantity}
                className="
                  flex
                  h-full
                  w-9
                  items-center
                  justify-center
                  text-[#293b25]
                  transition
                  hover:bg-[#eee9df]
                "
              >
                <FiMinus size={12} />
              </button>

              <span
                className="
                  min-w-5
                  text-center
                  text-[10px]
                  font-semibold
                  text-[#293b25]
                  sm:text-xs
                "
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  quantity >= product?.stock
                }
                className="
                  flex
                  h-full
                  w-9
                  items-center
                  justify-center
                  text-[#293b25]
                  transition
                  hover:bg-[#eee9df]
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <FiPlus size={12} />
              </button>
            </div>

            {/* VIEW CART */}

            <button
              type="button"
              onClick={handleViewCart}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#293b25]
                text-white
                transition-all
                duration-300
                hover:bg-[#1f2e1c]
                sm:h-10
                sm:w-10
              "
              title="View Cart"
            >
              <FiArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}