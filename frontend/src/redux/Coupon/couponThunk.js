import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ServerURL } from "../../App.jsx"


// =====================================================
// GET COUPONS
// =====================================================

export const getCouponsThunk = createAsyncThunk(
  "coupon/getCoupons",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ServerURL}/api/v1/coupon/all`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get coupons",
      );
    }
  },
);

// =====================================================
// CREATE
// =====================================================

export const createCouponThunk = createAsyncThunk(
  "coupon/createCoupon",

  async (data, { rejectWithValue }) => {
    try {
        console.log("Api Hit")
      const response = await axios.post(
        `${ServerURL}/api/v1/coupon/create`,
        data,
        {
          withCredentials: true,
        },
      );
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create coupon",
      );
    }
  },
);

// =====================================================
// UPDATE
// =====================================================

export const updateCouponThunk = createAsyncThunk(
  "coupon/updateCoupon",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ServerURL}/api/v1/coupon/update/${id}`,
        data,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update coupon",
      );
    }
  },
);

// =====================================================
// DELETE
// =====================================================

export const deleteCouponThunk = createAsyncThunk(
  "coupon/deleteCoupon",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/coupon/delete/${id}`,
        {
          withCredentials: true,
        },
      );

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon",
      );
    }
  },
);

// =====================================================
// TOGGLE
// =====================================================

export const toggleCouponThunk = createAsyncThunk(
  "coupon/toggleCoupon",

  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ServerURL}/api/v1/coupon/toggle/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update coupon",
      );
    }
  },
);

// =====================================================
// APPLY COUPON
// =====================================================

export const applyCouponThunk = createAsyncThunk(
  "coupon/applyCoupon",

  async ({ code, cartAmount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/coupon/apply`,
        {
          code,
          cartAmount,
        },
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid coupon");
    }
  },
);
