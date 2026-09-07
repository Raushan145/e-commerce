import { createSlice } from "@reduxjs/toolkit";

import {
  getCategoriesThunk,
  getCategoryByIdThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "./categoryThunk";

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  successMessage: null,

};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCategoryMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    
    // GET ALL

    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories || [];
      })

      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to get categories";
      });

    // GET BY ID

    builder
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload.category || null;
      })

      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to get category";
      });

    // CREATE

    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.category) {
          state.categories.unshift(action.payload.category);
        }

        state.successMessage = action.payload.message;
      })

      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create category";
      });

    // UPDATE

    builder
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload.category;

        if (updatedCategory) {
          const index = state.categories.findIndex(
            (item) => item._id === updatedCategory._id,
          );

          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }

          state.selectedCategory = updatedCategory;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to update category";
      });

    // DELETE

    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (item) => item._id !== action.payload.id,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to delete category";
      });
  },
});

export const { clearCategoryMessage, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
