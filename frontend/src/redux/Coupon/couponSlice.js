import { createSlice } from "@reduxjs/toolkit";

import {
  getCouponsThunk,
  createCouponThunk,
  updateCouponThunk,
  deleteCouponThunk,
  toggleCouponThunk,
  applyCouponThunk,
} from "./couponThunk";

const initialState = {
  coupons: [],

  appliedCoupon: null,

  discount: 0,

  finalAmount: null,

  loading: false,

  error: null,

  successMessage: null,
};

const couponSlice = createSlice({
  name: "coupon",

  initialState,

  reducers: {
    clearCoupon: (state) => {
      state.appliedCoupon = null;
      state.discount = 0;
      state.finalAmount = null;
      state.error = null;
    },

    clearCouponMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    // =================================================
    // GET
    // =================================================

    builder

      .addCase(getCouponsThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCouponsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.coupons || [];
      })

      .addCase(getCouponsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get coupons";
      });

    // =================================================
    // CREATE
    // =================================================

    builder

      .addCase(createCouponThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCouponThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.coupons.unshift(action.payload.coupon);

        state.successMessage = action.payload.message;
      })

      .addCase(createCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";
      });

    // =================================================
    // UPDATE
    // =================================================

    builder

      .addCase(updateCouponThunk.fulfilled, (state, action) => {
        const updated = action.payload.coupon;

        const index = state.coupons.findIndex(
          (item) => item._id === updated._id,
        );

        if (index !== -1) {
          state.coupons[index] = updated;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateCouponThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to update coupon";
      });

    // =================================================
    // DELETE
    // =================================================

    builder

      .addCase(deleteCouponThunk.fulfilled, (state, action) => {
        const deletedId = action.payload.id;

        state.coupons = state.coupons.filter((item) => item._id !== deletedId);

        state.successMessage = action.payload.message;
      })

      .addCase(deleteCouponThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete coupon";
      });

    // =================================================
    // TOGGLE
    // =================================================

    builder

      .addCase(toggleCouponThunk.fulfilled, (state, action) => {
        const updated = action.payload.coupon;

        const index = state.coupons.findIndex(
          (item) => item._id === updated._id,
        );

        if (index !== -1) {
          state.coupons[index] = updated;
        }
      })

      .addCase(toggleCouponThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to update status";
      });

    // =================================================
    // APPLY
    // =================================================

    builder

      .addCase(applyCouponThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyCouponThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.appliedCoupon = action.payload.coupon;

        state.discount = action.payload.discount;

        state.finalAmount = action.payload.finalAmount;

        state.successMessage = action.payload.message;
      })

      .addCase(applyCouponThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Invalid coupon";
      });
  },
});

export const { clearCoupon, clearCouponMessage } = couponSlice.actions;

export default couponSlice.reducer;
