import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ServerURL } from "../../App";

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ServerURL}/api/v1/address/create`,
        addressData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

export const getMyAddresses = createAsyncThunk(
  "address/getMyAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ServerURL}/api/v1/address/my-addresses`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ServerURL}/api/v1/address/update/${id}`,
        addressData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${ServerURL}/api/v1/address/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ServerURL}/api/v1/address/default/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set default address"
      );
    }
  }
);