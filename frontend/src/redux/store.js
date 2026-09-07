import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice.js";
import couponReducer from "./Coupon/couponSlice.js";
import collectionReducer from "./collections/collectionSlice.js";
import categoryReducer from "./category/categorySlice.js";
import productReducer from "./Product/productSlice.js";
import cartReducer from "./Cart/cartSlice.js";
import bannerReducer from "./Banner/bannerSlice.js";


export const store = configureStore({
  reducer: {
    user: userReducer,
    coupon: couponReducer,
    collection: collectionReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    banner:bannerReducer
  },
});


store.subscribe(() => {
  const cartItems = store.getState().cart.cartItems;

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
});