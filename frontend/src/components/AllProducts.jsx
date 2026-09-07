import { useEffect, useRef } from "react";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProductsThunk,
} from "../redux/Product/productThunk";

import ProductCard from "./ProductCard";

const AllProducts = () => {
  const dispatch = useDispatch();

  const loadMoreRef = useRef(null);

  const {
    allProducts = [],allProductsPage,allProductsHasMore,allProductsLoading,allProductsLoadingMore,
  } = useSelector((state) => state.product);

  // ==========================================
  // FIRST LOAD
  // ==========================================

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(
        getAllProductsThunk({
          page: 1,
          limit: 10,
        }),
      );
    }
  }, [dispatch]);

  // ==========================================
  // INFINITE SCROLL
  // ==========================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          allProductsHasMore &&
          !allProductsLoadingMore &&
          !allProductsLoading
        ) {
          dispatch(
            getAllProductsThunk({
              page: allProductsPage + 1,
              limit: 10,
            }),
          );
        }
      },
      {
        rootMargin: "300px",
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    dispatch,
    allProductsPage,
    allProductsHasMore,
    allProductsLoading,
    allProductsLoadingMore,
  ]);

  // ==========================================
  // INITIAL LOADING
  // ==========================================

  if (allProductsLoading && allProducts.length === 0) {
    return (
      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="h-7 w-40 animate-pulse rounded bg-gray-100" />

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[4/5] rounded-xl bg-gray-100" />

                <div className="mt-3 h-3 w-2/3 rounded bg-gray-100" />

                <div className="mt-2 h-3 w-1/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (allProducts.length === 0) {
    return (
      <section className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <FiPackage
            size={28}
            className="mx-auto text-gray-300"
          />

          <p className="mt-3 text-sm text-gray-400">
            No products found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-1 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex items-center px-2 md:px-5  justify-between py-1 pb-1">
               <button></button>
   
             <div>
   
               <h2
                 className="
                   font-serif
                   text-[#293b25]
                   text-lg
                   md:text-2xl
                 "
               >
                 All Collections
               </h2>
   
               <div className="flex justify-center items-center gap-2 ">
                 <span className="w-7 sm:w-10 h-px bg-[#c9a96e]" />
   
                 <span className="text-[#c9a96e] text-[8px]">
                   ◆
                 </span>
   
                 <span className="w-7 sm:w-10 h-px bg-[#c9a96e]" />
               </div>
             </div>
   
             <button
               onClick={()=> navigate("/all")}
               className="
                 text-[10px]
                 sm:text-xs
                 text-[#5a5a4e]
                 underline
                 underline-offset-4
                 hover:text-[#293b25] cursor-pointer
               "
             >
               View All
             </button>
   
           </div>

        {/* ======================================
            PRODUCTS
        ====================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-3
            gap-y-7

           
            sm:gap-x-5

            lg:grid-cols-5
            md:grid-cols-4
            lg:gap-x-6
            lg:gap-y-10
          "
        >
          {allProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {/* ======================================
            LOAD MORE OBSERVER
        ====================================== */}

        <div
          ref={loadMoreRef}
          className="flex min-h-[80px] items-center justify-center"
        >
          {allProductsLoadingMore && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-200
                  border-t-[#293b25]
                "
              />

              Loading more products...
            </div>
          )}

          {!allProductsHasMore &&
            allProducts.length > 0 && (
              <p className="text-[10px] text-gray-400">
                You've reached the end.
              </p>
            )}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;