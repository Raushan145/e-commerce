import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk, getProfileThunk, googleAuthThunk, logoutAllDevicesThunk, resetForgotPasswordThunk, sendForgotPasswordOtpThunk, signinThunk, signoutThunk, signupThunk, updateProfileImageThunk, updateProfileThunk, verifyForgotPasswordOtpThunk } from "./userThunk";

const initialState = {
  userData: null,
  loading: false,
  googleLoading: false,
  error: null,
  isAuthenticated: false,
  isAuthChecked: false,
  cartItems: [],
  orders: [],
  imageLoading: false,
  otpVerified: false,
  passwordReset: false,
  error:null,
  message:null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserMessage: (state) => {
      state.error = null;
      state.success = false;
    },
     resetForgotPasswordState: (state) => {
      state.forgotPassword = {
        loading: false,
        error: null,
        message: null,
        otpVerified: false,
        passwordReset: false,
      };
    },
  },

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

    // Google-signIn
    builder.addCase(googleAuthThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(googleAuthThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    });
    builder.addCase(googleAuthThunk.rejected, (state, action) => {
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

    // signoutAllDevices
    builder.addCase(logoutAllDevicesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAllDevicesThunk.fulfilled, (state) => {
      console.log("fulfilled slice Hit");
      state.loading = false;
      state.userData = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(logoutAllDevicesThunk.rejected, (state, action) => {
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

     
    builder.addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
      })

    builder.addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder.addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
       state.success = false;
      })
      
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload.user;
      })

    builder.addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


     
    builder.addCase(updateProfileImageThunk.pending, (state) => {
        state.imageLoading = true;
        state.error = null;
      })

    builder.addCase(updateProfileImageThunk.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.success = true;
        state.userData = action.payload.user;
      })

    builder.addCase(updateProfileImageThunk.rejected, (state, action) => {
        state.imageLoading = false;
        state.error = action.payload;
      });

      // SEND OTP
      builder.addCase(sendForgotPasswordOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(sendForgotPasswordOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "OTP sent successfully";
      })

      .addCase(sendForgotPasswordOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY OTP
      .addCase(verifyForgotPasswordOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyForgotPasswordOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.message =
          action.payload?.message || "OTP verified successfully";
      })

      .addCase(verifyForgotPasswordOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetForgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetForgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordReset = true;
        state.message =
          action.payload?.message || "Password reset successfully";
      })

      .addCase(resetForgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });







  },
});

export const { clearUserMessage } = userSlice.actions;
export default userSlice.reducer;
