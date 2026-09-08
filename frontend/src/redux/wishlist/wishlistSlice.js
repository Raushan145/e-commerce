import { createSlice } from "@reduxjs/toolkit";

import {
  getWishlistThunk,
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "./wishlistThunk";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET WISHLIST
      // ==========================

      .addCase(getWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload || [];
      })

      .addCase(getWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ==========================
      // ADD WISHLIST
      // ==========================

      .addCase(addToWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload || [];
      })

      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ==========================
      // REMOVE WISHLIST
      // ==========================

      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload || [];
      })

      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;