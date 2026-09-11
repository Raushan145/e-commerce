import { createSlice } from "@reduxjs/toolkit";
import { createAddress, getMyAddresses, updateAddress,deleteAddress,setDefaultAddress, } from "./addressThunk";


const initialState = {
  addresses: [],
  loading: false,
  error: null,
  success: false,
  message: "",
};

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {
    clearAddressMessage: (state) => {
     
      state.error = null;
      state.message = "";
    },

    clearAddresses: (state) => {
      state.addresses = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE ADDRESS

      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.address) {
          state.addresses.unshift(action.payload.address);
        }
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ADDRESSES

      .addCase(getMyAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses || [];
      })

      .addCase(getMyAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ADDRESS

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedAddress = action.payload.address;

        const index = state.addresses.findIndex(
          (address) => address._id === updatedAddress._id
        );

        if (index !== -1) {
          state.addresses[index] = updatedAddress;
        }
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE ADDRESS

      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload.id
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SET DEFAULT ADDRESS

      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const defaultAddress = action.payload.address;

        state.addresses = state.addresses.map((address) => ({
          ...address,
          isDefault: address._id === defaultAddress._id,
        }));
      })

      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearAddressMessage,clearAddresses} = addressSlice.actions;

export default addressSlice.reducer;