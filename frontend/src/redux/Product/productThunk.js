import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerURL } from "../../App.jsx";

// =====================================================
// CREATE PRODUCT
// =====================================================

export const createProductThunk = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/product/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getProductsThunk = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/product/get-all`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get products"
      );
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "product/getAllProducts",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      console.log("Api Hit in Thunk")
      const response = await axios.get(
        `${ServerURL}/api/v1/product/all-products?page=${page}&limit=${limit}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to get products",
      );
    }
  },
);

// GET New PRODUCTS

export const getNewArrivalProductThunk = createAsyncThunk(
  "product/getNewArrival",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/product/new-arrival`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get products"
      );
    }
  }
);

// =====================================================
// GET PRODUCT BY ID
// =====================================================

export const getProductByIdThunk = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/product/get/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get product"
      );
    }
  }
);

// =====================================================
// UPDATE PRODUCT
// =====================================================

export const updateProductThunk = createAsyncThunk(
  "product/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ServerURL}/api/v1/product/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// =====================================================
// DELETE PRODUCT
// =====================================================

export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/product/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);
// ADD RECENTLY VIEWED

export const addRecentlyViewedThunk = createAsyncThunk(
  "product/addRecentlyViewed",

  async (productId, { rejectWithValue }) => {

    try {

      const response = await axios.post(
        `${ServerURL}/api/v1/product/recent-view/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update recently viewed"
      );

    }

  }
);

// JUST FOR YOU

export const getJustForYouThunk = createAsyncThunk(
  "product/getJustForYou",

  async (_, { rejectWithValue }) => {

    try {

      const response = await axios.get(
        `${ServerURL}/api/v1/product/just-for-you`,
        {
          withCredentials: true,
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to get recommendations"
      );

    }

  }
);

// Get Product By Catgory
export const getProductsByCategoryThunk = createAsyncThunk(
  "product/getProductsByCategory",

  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/product/${categoryId}/products`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get category products"
      );
    }
  }
);

export const getProductsByCollectionThunk = createAsyncThunk(
  "product/getProductsByCollection",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/product/collection/${collectionId}/products`,
        { withCredentials: true },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get collection products",
      );
    }
  },
);

