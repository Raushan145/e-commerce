import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: savedCart && savedCart !== "undefined"? JSON.parse(savedCart): [],
  wishListItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id,
      );

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.cartItems.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem._id === id);
    
    //   if (item && quantity > 0) {
    //     item.quantity = quantity;
    //   }

      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== id
        );
      } else {
        item.quantity = quantity;
      }

    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    toggleWishlist: (state, action) => {
      const exists = state.wishListItem.some(
        (item) => item._id === action.payload._id,
      );

      state.wishListItem = exists
        ? state.wishListItem.filter((item) => item._id !== action.payload._id)
        : [...state.wishListItem, action.payload];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;