import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";

import ProductCard from "../../components/ProductCard";
import { getWishlistThunk } from "../../redux/wishlist/wishlistThunk";

const WishLists = () => {
  const dispatch = useDispatch();

  const { wishlistItems, loading } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  if (loading && wishlistItems.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-3 md:px-8">

      {/* Header */}

      <div className="mb-3 flex items-center gap-3">
        {/* <IoMdHeart className="text-3xl text-red-500" /> */}

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Wishlist
          </h1>

          <p className="text-sm text-gray-500">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "item"
              : "items"}{" "}
            saved
          </p>
        </div>
      </div>


      {/* Empty Wishlist */}

      {wishlistItems.length === 0 ? (
        <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">

          <div className="mb-4 rounded-full bg-gray-100 p-5">
            <IoMdHeart className="text-5xl text-gray-300" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Save your favorite products here.
          </p>

        </div>
      ) : (

        /* Products */

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      )}

    </div>
  );
};

export default WishLists;