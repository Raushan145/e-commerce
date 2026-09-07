import { createSlice } from "@reduxjs/toolkit";

import {
  createProductThunk,
  getProductsThunk,
  getProductByIdThunk,
  updateProductThunk,
  deleteProductThunk,
  getNewArrivalProductThunk,
  getJustForYouThunk,
  getProductsByCategoryThunk,
  getProductsByCollectionThunk,
  getAllProductsThunk,
} from "./productThunk";

const initialState = {
  products: [],
  allProducts: [],
  allProductsPage: 1,
  allProductsHasMore: true,
  allProductsLoading: false,
  allProductsLoadingMore: false,
  newArrivals: [],
  justForYou: [],
  recentlyViewed: [],
  selectedProduct: null,
  loading: false,
  error: null,
  successMessage: null,
  category: null,
  collection: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProductMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearCategoryProducts: (state) => {
      state.category = null;
      state.collection = null;
      state.products = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // GET ALL

    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        // console.log(action.payload.products);
      })

      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(getAllProductsThunk.pending, (state, action) => {
      const page = action.meta.arg?.page || 1;

      if (page === 1) {
        state.allProductsLoading = true;
      } else {
        state.allProductsLoadingMore = true;
      }
    })

      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        const page = action.payload.currentPage || 1;

        if (page === 1) {
          state.allProducts = action.payload.products;
        } else {
          state.allProducts.push(...action.payload.products);
        }

        state.allProductsPage = page;
        state.allProductsHasMore = action.payload.hasMore;

        state.allProductsLoading = false;
        state.allProductsLoadingMore = false;
      })

      .addCase(getAllProductsThunk.rejected, (state) => {
        state.allProductsLoading = false;
        state.allProductsLoadingMore = false;
      })

    // New Arrival
    builder
      .addCase(getNewArrivalProductThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNewArrivalProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = action.payload.products || [];
      })

      .addCase(getNewArrivalProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET BY ID

    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.product;
        state.loading = false;
      })

      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE

    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.product) {
          state.products.unshift(action.payload.product);
        }

        state.successMessage = action.payload.message;
      })

      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE

    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload.product;

        const index = state.products.findIndex(
          (item) => item._id === updatedProduct._id,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        state.selectedProduct = updatedProduct;
        state.successMessage = action.payload.message;
      })

      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE

    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (item) => item._id !== action.payload.productId,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Recent viewed

    // builder
    //   .addCase(getJustForYouThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })

    //   .addCase(getJustForYouThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state. = action.payload.products || [];
    //   })

    //   .addCase(getJustForYouThunk.rejected, (state, action) => {
    //     state.loading = false;

    //     state.error = action.payload || "Failed to get recommendations";
    //   });

    // JUST FOR YOU

    builder

      .addCase(getJustForYouThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getJustForYouThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.justForYou = action.payload.products || [];
        state.recentlyViewed = action.payload.recentlyViewed || [];
      })

      .addCase(getJustForYouThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to get recommendations";
      });

    builder

      .addCase(getProductsByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.category = action.payload.category || null;
        state.collection = null;

        state.products = action.payload.products || [];
      })

      .addCase(getProductsByCategoryThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to get category products";
      });

    builder
      .addCase(getProductsByCollectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCollectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.collection = action.payload.collection || null;
        state.category = null;
        state.products = action.payload.products || [];
      })
      .addCase(getProductsByCollectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get collection products";
      });
  },
});

export const { clearProductMessage, clearSelectedProduct, clearCategoryProducts } =
  productSlice.actions;

export default productSlice.reducer;
