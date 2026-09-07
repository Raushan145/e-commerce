import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerURL } from "../../App.jsx";

// =====================================================
// CREATE COLLECTION
// =====================================================

export const createCollectionThunk = createAsyncThunk(
  "collection/create",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/collection/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create collection",
      );
    }
  },
);

// =====================================================
// GET COLLECTIONS
// =====================================================

export const getCollectionsThunk = createAsyncThunk(
  "collection/get",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ServerURL}/api/v1/collection`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get collections",
      );
    }
  },
);

// =====================================================
// UPDATE COLLECTION
// =====================================================

export const updateCollectionThunk = createAsyncThunk(
  "collection/update",

  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ServerURL}/api/v1/collection/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update collection",
      );
    }
  },
);

// =====================================================
// DELETE COLLECTION
// =====================================================

export const deleteCollectionThunk = createAsyncThunk(
  "collection/delete",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/collection/delete/${id}`,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete collection",
      );
    }
  },
);
