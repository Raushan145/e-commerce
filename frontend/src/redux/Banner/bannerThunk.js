import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerURL } from "../../App";

// GET ACTIVE BANNERS

export const getActiveBannersThunk = createAsyncThunk(
  "banner/getActive",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${ServerURL}/api/v1/banner/active`,
        { withCredentials: true },
      );

      return data.banners;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get banners"
      );
    }
  }
);

// ==========================================
// GET ALL BANNERS
// ==========================================

export const getAllBannersThunk = createAsyncThunk(
  "banner/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${ServerURL}/api/v1/banner/all`,
        { withCredentials: true },
      );

      return data.banners;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get banners"
      );
    }
  }
);

// ==========================================
// CREATE BANNER
// ==========================================

export const createBannerThunk = createAsyncThunk(
  "banner/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${ServerURL}/api/v1/banner/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create banner"
      );
    }
  }
);

// ==========================================
// UPDATE BANNER
// ==========================================

export const updateBannerThunk = createAsyncThunk(
  "banner/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${ServerURL}/api/v1/banner/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update banner"
      );
    }
  }
);

// ==========================================
// TOGGLE
// ==========================================

export const toggleBannerThunk = createAsyncThunk(
  "banner/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${ServerURL}/api/v1/banner/toggle/${id}`,
        {},
        { withCredentials: true },
      );

      return data.banner;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update banner"
      );
    }
  }
);

// ==========================================
// DELETE
// ==========================================

export const deleteBannerThunk = createAsyncThunk(
  "banner/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${ServerURL}/api/v1/banner/delete/${id}`,
        { withCredentials: true },
      );

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete banner"
      );
    }
  }
);