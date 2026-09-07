import { createSlice } from "@reduxjs/toolkit";

import {
  getActiveBannersThunk,
  getAllBannersThunk,
  createBannerThunk,
  updateBannerThunk,
  toggleBannerThunk,
  deleteBannerThunk,
} from "./bannerThunk";

const initialState = {
  banners: [],
  activeBanners: [],
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banner",

  initialState,

  reducers: {
    clearBannerError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // GET ACTIVE
      // =====================================

      .addCase(
        getActiveBannersThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getActiveBannersThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.activeBanners = action.payload;
        }
      )

      .addCase(
        getActiveBannersThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================
      // GET ALL
      // =====================================

      .addCase(
        getAllBannersThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getAllBannersThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.banners = action.payload;
        }
      )

      .addCase(
        getAllBannersThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================
      // CREATE
      // =====================================

      .addCase(
        createBannerThunk.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        createBannerThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.banners.unshift(action.payload);

          if (action.payload.isActive) {
            state.activeBanners.push(action.payload);
          }
        }
      )

      .addCase(
        createBannerThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================
      // UPDATE
      // =====================================

      .addCase(
        updateBannerThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          const index = state.banners.findIndex(
            (item) => item._id === action.payload._id
          );

          if (index !== -1) {
            state.banners[index] = action.payload;
          }

          const activeIndex =
            state.activeBanners.findIndex(
              (item) => item._id === action.payload._id
            );

          if (action.payload.isActive) {
            if (activeIndex === -1) {
              state.activeBanners.push(action.payload);
            } else {
              state.activeBanners[activeIndex] =
                action.payload;
            }
          } else if (activeIndex !== -1) {
            state.activeBanners.splice(activeIndex, 1);
          }
        }
      )

      // =====================================
      // TOGGLE
      // =====================================

      .addCase(
        toggleBannerThunk.fulfilled,
        (state, action) => {
          const index = state.banners.findIndex(
            (item) => item._id === action.payload._id
          );

          if (index !== -1) {
            state.banners[index] = action.payload;
          }

          const activeIndex =
            state.activeBanners.findIndex(
              (item) => item._id === action.payload._id
            );

          if (action.payload.isActive) {
            if (activeIndex === -1) {
              state.activeBanners.push(action.payload);
            }
          } else if (activeIndex !== -1) {
            state.activeBanners.splice(activeIndex, 1);
          }
        }
      )

      // =====================================
      // DELETE
      // =====================================

      .addCase(
        deleteBannerThunk.fulfilled,
        (state, action) => {
          state.banners = state.banners.filter(
            (item) => item._id !== action.payload
          );

          state.activeBanners =
            state.activeBanners.filter(
              (item) => item._id !== action.payload
            );
        }
      );
  },
});

export const { clearBannerError } =
  bannerSlice.actions;

export default bannerSlice.reducer;