import { createSlice } from "@reduxjs/toolkit";
import {
  createCollectionThunk,
  getCollectionsThunk,
  updateCollectionThunk,
  deleteCollectionThunk,
} from "./collectionThunk";

const initialState = {
  collections: [],
  loading: false,
  error: null,
  successMessage: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,

  reducers: {
    clearCollectionMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },
    addcollections:(state,action) =>{
        state.collections = action.payload
    }
  },

  extraReducers: (builder) => {
    // =====================================================
    // GET COLLECTIONS
    // =====================================================

    builder
      .addCase(getCollectionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCollectionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload.collections || [];
      })

      .addCase(getCollectionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to get collections";
      });

    // =====================================================
    // CREATE COLLECTION
    // =====================================================

    builder
      .addCase(createCollectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCollectionThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.collections.unshift(
          action.payload.collection
        );

        state.successMessage = action.payload.message;
      })

      .addCase(createCollectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to create collection";
      });

    // =====================================================
    // UPDATE COLLECTION
    // =====================================================

    builder
      .addCase(updateCollectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCollectionThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCollection =
          action.payload.collection;

        const index = state.collections.findIndex(
          (item) => item._id === updatedCollection._id
        );

        if (index !== -1) {
          state.collections[index] = updatedCollection;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateCollectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to update collection";
      });

    // =====================================================
    // DELETE COLLECTION
    // =====================================================

    builder
      .addCase(deleteCollectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCollectionThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.collections = state.collections.filter(
          (item) => item._id !== action.payload.collectionId
        );

        state.successMessage = action.payload.message;
      })

      .addCase(deleteCollectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete collection";
      });
  },
});

export const {
  clearCollectionMessage,addcollections
} = collectionSlice.actions;

export default collectionSlice.reducer;