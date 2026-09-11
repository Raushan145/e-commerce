import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { ServerURL } from "../../App.jsx";


export const signupThunk = createAsyncThunk(
    "user/signup",
    async ({ name, email, password }, { rejectWithValue }) => {

        try {
            
        const response = await axios.post(`${ServerURL}/api/v1/user/signup`, { name, email, password }, { withCredentials: true });
        console.log(response?.data)
        
        return response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "Signup failed" );

        }
    }
)

export const signinThunk = createAsyncThunk(
    "user/signin",
    async ({ email, password }, { rejectWithValue }) => {

        try {
            
        const response = await axios.post(`${ServerURL}/api/v1/user/signin`, { email, password }, { withCredentials: true });

       
        return response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "SignIn failed" );

        }
    }
)

export const googleAuthThunk = createAsyncThunk(
    "user/google-auth",
    async ({ email, name, mobile = "", profileImage = { url: "", public_id: "" }, role = "user" }, { rejectWithValue }) => {
        try {
            const normalizedProfileImage = typeof profileImage === "string"
                ? { url: profileImage, public_id: "" }
                : profileImage || { url: "", public_id: "" };

            const response = await axios.post(
                `${ServerURL}/api/v1/user/google-auth`,
                {
                    email,
                    fullName: name,
                    mobile,
                    profileImage: normalizedProfileImage,
                    role,
                },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Google sign in failed");
        }
    }
)

export const signoutThunk = createAsyncThunk(
    "user/signout",
    async (_, {rejectWithValue}) =>{

        try {
              console.log("fulfilled thunk Hit")
        const response = await axios.post(`${ServerURL}/api/v1/user/signout`, {}, { withCredentials: true });

       console.log(response)
        return response.data.user || response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "Signout failed" );

        }
    }
)

export const logoutAllDevicesThunk = createAsyncThunk(
  "auth/logoutAllDevices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/user/logout-all-devices`,
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout from all devices"
      );
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
    "user/getCurrentUser",
    async (_, {rejectWithValue}) =>{

        try {
            
        const response = await axios.get( `${ServerURL}/api/v1/user/current-user`, { withCredentials: true, } );

        return response.data;

        } catch (error) {
            // console.log(error.response.data)
            // console.log(error.response)
            return rejectWithValue( error.response?.data?.message || "User not authenticated" );

        }
    }
)

export const getProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/user/profile`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ServerURL}/api/v1/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const updateProfileImageThunk = createAsyncThunk(
  "user/updateProfileImage",
  async (image, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("profileImage", image);

      const response = await axios.patch(
        `${ServerURL}/api/v1/user/profile/image`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile image"
      );
    }
  }
);

export const sendForgotPasswordOtpThunk = createAsyncThunk(
  "user/sendForgotPasswordOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/user/send-otp`,
        { email },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const verifyForgotPasswordOtpThunk = createAsyncThunk(
  "user/verifyForgotPasswordOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/user/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  }
);

export const resetForgotPasswordThunk = createAsyncThunk(
  "user/resetForgotPassword",
  async ({ email, password, newPassword }, { rejectWithValue }) => {
    try {
      const finalPassword = newPassword ?? password;

      const response = await axios.post(
        `${ServerURL}/api/v1/user/reset-password`,
        { email, newPassword: finalPassword },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
