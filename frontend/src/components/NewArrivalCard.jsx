import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../redux/wishlist/wishlistThunk";

export default function NewArrivalCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

  const handleWishlist = (event) => {
    event.stopPropagation();
    dispatch(
      isWishlisted
        ? removeFromWishlistThunk(product._id)
        : addToWishlistThunk(product._id),
    );
  };

  return (
    <article
      className="
        group
        relative
        shrink-0
        w-[125px]
        sm:w-[160px]
        md:w-[165px]
        lg:w-[180px]
        bg-[#fffdfa]
        rounded-md
        border
        border-[#eee7da]
        overflow-hidden
        hover:shadow-md
        transition-all
        duration-300
        cursor-pointer
      "
      onClick={() => navigate(`/product/${product._id}`)}
    >

      {/* Image */}
      <div
        className="
          relative
          h-[125px]
          sm:h-[160px]
          md:h-[125px]
          lg:h-[160px]
          bg-[#f7f1e7]
          overflow-hidden
        "
      >

        {/* New Badge */}
        <span
          className="
            absolute
            left-2
            top-2
            z-10

            px-1.5
            py-1

            bg-[#293b25]
            text-white

            rounded-sm

            text-[7px]
            sm:text-[8px]

            tracking-wide
          "
        >
          NEW
        </span>

        {/* Wishlist */}
        <button
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            right-2
            top-2
            z-10

            w-7
            h-7

            rounded-full

            bg-white/90

            flex
            items-center
            justify-center

            text-gray-600

            hover:text-red-500

            transition
          "
          onClick={handleWishlist}
        >
          <FiHeart
            size={14}
            className={isWishlisted ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        {/* Product Image */}
        <img
          src={product?.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="
            w-full
            h-full

            object-cover

            transition-transform
            duration-500

            group-hover:scale-105
          "
        />

      </div>

      {/* Product Info */}
      <div className="px-2 py-2.5 sm:px-3 sm:py-3">

        <h3
          className="
            text-[#37352f]

            text-[9px]
            sm:text-[11px]
            md:text-xs

            font-medium

            truncate
          "
          title={product.name}
        >
          {product.name}
        </h3>

        <p
          className="
            mt-1

            text-[#292d23]

            text-[10px]
            sm:text-xs
            md:text-sm

            font-semibold
          "
        >
          ₹{(product.price || 0).toLocaleString("en-IN")}
        </p>

      </div>

    </article>
  );
}