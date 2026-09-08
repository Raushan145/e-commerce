import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ServerURL } from "../../App";


// Get My Wishlist

export const getWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/wishlist`,
        {
          withCredentials: true,
        }
      );

      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wishlist"
      );
    }
  }
);

// Add To Wishlist

export const addToWishlistThunk = createAsyncThunk(
  "wishlist/add",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/wishlist/add/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response)
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add wishlist"
      );
    }
  }
);


// ==========================================
// Remove From Wishlist
// ==========================================

export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/wishlist/remove/${productId}`,
        {
          withCredentials: true,
        }
      );

      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove wishlist"
      );
    }
  }
);