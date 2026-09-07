import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk, signinThunk, signoutThunk, signupThunk } from "./userThunk";

const initialState = {
  userData: null,
  loading: false,
  googleLoading: false,
  error: null,
  isAuthenticated: false,
  isAuthChecked: false,
  cartItems: [],
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // signup
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // signIn
    builder.addCase(signinThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.userData = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // signout
    builder.addCase(signoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signoutThunk.fulfilled, (state) => {
      console.log("fulfilled slice Hit");
      state.loading = false;
      state.userData = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(signoutThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

     // getCurrentUser
    builder.addCase(getCurrentUserThunk.pending, (state) => {
    state.loading = true;
    state.isAuthChecked = false;
    });

    builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.userData = action.payload;
    console.log(action.payload)
    state.isAuthenticated = true;
    state.isAuthChecked = true;
    });

    builder.addCase(getCurrentUserThunk.rejected, (state, action) => {
    state.loading = false;
    state.userData = null;
    
    state.isAuthChecked = true;
    state.error = action.payload;
    });

  },
});

export default userSlice.reducer;
