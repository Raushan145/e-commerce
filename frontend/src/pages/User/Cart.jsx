import React, { useMemo } from "react";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiHeart,
  FiShield,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateCartQuantity,
  removeFromCart,
} from "../../redux/Cart/cartSlice";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart?.cartItems || []
  );

  // PRICE CALCULATION

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;

  const total = subtotal + shipping;

  // QUANTITY

  const increaseQuantity = (item) => {
    const maxStock = Number(item.stock) || 999;

    if (item.quantity >= maxStock) return;

    dispatch(
      updateCartQuantity({
        id: item._id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateCartQuantity({
        id: item._id,
        quantity: item.quantity - 1,
      })
    );
  };

  // ==========================================
  // REMOVE
  // ==========================================

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[75vh] bg-[#fffdf9]  py-10 px-6 lg:px-10">
        <div className="mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center">
          <div className="w-full max-w-md text-center">

            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#f3f0e9]
                text-[#293b25]
              "
            >
              <FiShoppingBag size={28} strokeWidth={1.3} />
            </div>

            <p
              className="
                mt-1
                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-gray-400
              "
            >
              Your Shopping Bag
            </p>

            <h1
              className="
                mt-2
                font-serif
                text-3xl
                tracking-tight
                text-[#293b25]
                sm:text-4xl
              "
            >
              Your cart is empty
            </h1>

            <p
              className="
                mx-auto
                mt-3
                max-w-sm
                text-xs
                leading-5
                text-gray-500
              "
            >
              Looks like you haven't added anything to
              your cart yet. Discover something beautiful
              for yourself.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="
                mt-7
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-sm
                bg-[#293b25]
                px-7
                text-[10px]
                font-medium
                tracking-[0.12em]
                text-white
                transition
                hover:bg-[#1f2d1c]
              "
            >
              CONTINUE SHOPPING
              <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf9] px-4  sm:px-6  lg:px-10 ">

      <div className="mx-auto max-w-[1300px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            border-b
            border-[#ebe7df]
           md:pb-2 pb-1
          "
        >
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-gray-400
              pt-4
            "
          >
            Your Selection
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">

            <h1
              className="
                font-serif
                text-3xl
                tracking-tight
                text-[#293b25]
                sm:text-4xl
              "
            >
              Shopping Bag
            </h1>

            <span
              className="
                pb-1
                text-[10px]
                text-gray-400
              "
            >
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* ==========================================
            FREE SHIPPING MESSAGE
        ========================================== */}

        {subtotal < 999 && (
          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              gap-4
              rounded-sm
              border
              border-[#ebe7df]
              bg-[#faf8f3]
              px-4
              py-3
            "
          >
            <p className="text-[9px] text-gray-500 sm:text-[10px]">
              Add{" "}
              <span className="font-semibold text-[#293b25]">
                ₹{(999 - subtotal).toLocaleString("en-IN")}
              </span>{" "}
              more for free shipping
            </p>

            <div className="hidden h-1 w-28 overflow-hidden rounded-full bg-[#e5e1d9] sm:block">
              <div
                className="h-full bg-[#293b25]"
                style={{
                  width: `${Math.min(
                    (subtotal / 999) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div
          className="
            mt-7
            grid
            gap-8
            lg:grid-cols-[1fr_360px]
            lg:gap-12
          "
        >

          {/* ========================================
              CART ITEMS
          ======================================== */}

          <section>

            <div className="space-y-3">

              {cartItems.map((item) => {
                const image =
                  item.images?.[0] ||
                  item.image ||
                  "";

                const price =
                  Number(item.price) || 0;

                const basePrice =
                  Number(item.basePrice) || price;

                const quantity =
                  Number(item.quantity) || 1;

                const itemTotal =
                  price * quantity;

                return (
                  <article
                    key={item._id}
                    className="
                      group
                      relative
                      flex
                      gap-3
                      rounded-sm
                      border
                      border-[#ebe7df]
                      bg-white
                      p-2.5
                      transition
                      hover:border-[#dcd6ca]
                      sm:gap-5
                      sm:p-3
                    "
                  >

                    {/* PRODUCT IMAGE */}

                    <button
                      onClick={() =>
                        navigate(
                          `/product/${item._id}`
                        )
                      }
                      className="
                        relative
                        h-[125px]
                        w-[100px]
                        shrink-0
                        overflow-hidden
                        rounded-sm
                        bg-[#f5f1e9]
                        sm:h-[155px]
                        sm:w-[125px]
                      "
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                          "
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300">
                          <FiShoppingBag size={20} />
                        </div>
                      )}

                      {/* BADGE */}

                      {item.isNewArrival && (
                        <span
                          className="
                            absolute
                            left-2
                            top-2
                            rounded-sm
                            bg-white/95
                            px-2
                            py-1
                            text-[7px]
                            font-medium
                            text-[#293b25]
                            shadow-sm
                          "
                        >
                          NEW
                        </span>
                      )}
                    </button>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p
                            className="
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              text-gray-400
                            "
                          >
                            {item.category?.name ||
                              "Jewellery"}
                          </p>

                          <h2
                            className="
                              mt-1
                              truncate
                              text-xs
                              font-medium
                              text-[#292d23]
                              sm:text-sm
                            "
                          >
                            {item.name}
                          </h2>

                          {item.brand && (
                            <p className="mt-1 text-[9px] text-gray-400">
                              {item.brand}
                            </p>
                          )}

                        </div>

                        {/* REMOVE */}

                        <button
                          onClick={() =>
                            handleRemove(item._id)
                          }
                          aria-label="Remove product"
                          className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-gray-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <FiTrash2 size={14} />
                        </button>

                      </div>

                      {/* PRICE */}

                      <div className="mt-2 flex items-center gap-2">

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-[#293b25]
                            sm:text-sm
                          "
                        >
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        {basePrice > price && (
                          <span
                            className="
                              text-[9px]
                              text-gray-400
                              line-through
                            "
                          >
                            ₹
                            {basePrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}

                      </div>

                      {/* BOTTOM */}

                      <div
                        className="
                          mt-auto
                          flex
                          items-end
                          justify-between
                          gap-3
                          pt-3
                        "
                      >

                        {/* QUANTITY */}

                        <div
                          className="
                            flex
                            h-8
                            items-center
                            rounded-2xl
                            border
                            border-[#dedad2]
                          "
                        >
                          <button
                            onClick={() =>
                              decreaseQuantity(item)
                            }
                            disabled={quantity <= 1}
                            className="
                              flex
                              h-full
                              w-8
                              items-center
                              justify-center
                              text-gray-500
                              transition
                              hover:text-[#293b25]
                              disabled:cursor-not-allowed
                              disabled:opacity-30
                            "
                          >
                            <FiMinus size={11} />
                          </button>

                          <span
                            className="
                              w-7
                              text-center
                              text-[10px]
                              font-medium
                              text-[#293b25]
                            "
                          >
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item)
                            }
                            disabled={
                              quantity >=
                              (item.stock || 999)
                            }
                            className="
                              flex
                              h-full
                              w-8
                              items-center
                              justify-center
                              text-gray-500
                              transition
                              hover:text-[#293b25]
                              disabled:cursor-not-allowed
                              disabled:opacity-30
                            "
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>

                        {/* ITEM TOTAL */}

                        <div className="text-right">

                          <p className="text-[8px] text-gray-400">
                            Item total
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              font-semibold
                              text-[#293b25]
                              sm:text-sm
                            "
                          >
                            ₹
                            {itemTotal.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>

                    </div>
                  </article>
                );
              })}

            </div>

            {/* CONTINUE SHOPPING */}

            <button
              onClick={() => navigate("/shop")}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-[#293b25]
                transition
                hover:gap-3
              "
            >
              <FiArrowRight
                size={12}
                className="rotate-180"
              />
              Continue Shopping
            </button>

          </section>

          {/* ========================================
              ORDER SUMMARY
          ======================================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div
              className="
                rounded-sm
                border
                border-[#e8e3da]
                bg-white
                p-5
                sm:p-6
              "
            >

              <p
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-gray-400
                "
              >
                Order Summary
              </p>

              <h2
                className="
                  mt-2
                  font-serif
                  text-xl
                  text-[#293b25]
                "
              >
                Your total
              </h2>

              {/* PRICE */}

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Subtotal</span>

                  <span className="font-medium text-gray-700">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Shipping</span>

                  <span
                    className={
                      shipping === 0
                        ? "font-medium text-[#293b25]"
                        : "text-gray-700"
                    }
                  >
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="border-t border-[#eeeae2] pt-4">
                  <div className="flex items-center justify-between">

                    <span
                      className="
                        text-xs
                        font-medium
                        text-[#293b25]
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-lg
                        font-semibold
                        text-[#293b25]
                      "
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </span>

                  </div>

                  <p className="mt-1 text-right text-[8px] text-gray-400">
                    Inclusive of applicable taxes
                  </p>
                </div>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={() => navigate("/checkout")}
                className="
                  mt-6
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-sm
                  bg-[#293b25]
                  text-[9px]
                  font-medium
                  tracking-[0.18em]
                  text-white
                  transition
                  hover:bg-[#1f2d1c]
                "
              >
                PROCEED TO CHECKOUT
                <FiArrowRight size={14} />
              </button>

              {/* TRUST */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-[#eeeae2]
                  pt-5
                "
              >

                <div className="flex items-center gap-2">
                  <FiShield
                    size={14}
                    className="text-[#293b25]"
                  />

                  <span className="text-[8px] leading-3 text-gray-400">
                    Secure
                    <br />
                    Checkout
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FiHeart
                    size={14}
                    className="text-[#293b25]"
                  />

                  <span className="text-[8px] leading-3 text-gray-400">
                    Curated
                    <br />
                    With Care
                  </span>
                </div>

              </div>

            </div>

            {/* FREE SHIPPING */}

            {shipping === 0 && (
              <div
                className="
                  mt-3
                  rounded-sm
                  border
                  border-[#e8e3da]
                  bg-[#faf8f3]
                  px-4
                  py-3
                  text-center
                "
              >
                <p className="text-[9px] font-medium text-[#293b25]">
                  ✦ You unlocked free shipping
                </p>
              </div>
            )}

          </aside>

        </div>
      </div>
    </main>
  );
};

export default Cart;