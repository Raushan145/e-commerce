import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerURL } from "../../App.jsx";

// =====================================================
// GET ALL CATEGORIES
// =====================================================

export const getCategoriesThunk = createAsyncThunk(
  "category/getAll",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/category/get`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get categories"
      );
    }
  }
);

// =====================================================
// GET CATEGORY BY ID
// =====================================================

export const getCategoryByIdThunk = createAsyncThunk(
  "category/getById",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/category/get/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get category"
      );
    }
  }
);

// =====================================================
// CREATE CATEGORY
// =====================================================

export const createCategoryThunk = createAsyncThunk(
  "category/create",

  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("image", data.image);

      const response = await axios.post(
        `${ServerURL}/api/v1/category/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

// =====================================================
// UPDATE CATEGORY
// =====================================================

export const updateCategoryThunk = createAsyncThunk(
  "category/update",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);

      // Image only when user selects new image
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axios.put(
        `${ServerURL}/api/v1/category/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

// =====================================================
// DELETE CATEGORY
// =====================================================

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/category/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);