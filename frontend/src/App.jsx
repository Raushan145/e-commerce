import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserThunk } from './redux/User/userThunk';
import { getCollectionsThunk } from './redux/collections/collectionThunk';
import { getCategoriesThunk } from './redux/category/categoryThunk';
import { getAllProductsThunk, getNewArrivalProductThunk, getProductsThunk } from './redux/Product/productThunk';
import { getWishlistThunk } from './redux/wishlist/wishlistThunk';

export const ServerURL = "https://e-commerce-backend-6mkz.onrender.com";
// export const ServerURL = "http://localhost:8080";

const App = () => {

  const dispatch = useDispatch();
  const { userData } = useSelector( (state) => state.user);

  
  useEffect(() => {
    dispatch(getCurrentUserThunk());
    dispatch(getCollectionsThunk());
    dispatch(getCategoriesThunk());
    dispatch(getNewArrivalProductThunk());
    dispatch(getAllProductsThunk())
    // dispatch(getProductsThunk())
  }, [dispatch]);


  useEffect(() => {
      if (userData) {
        dispatch(getWishlistThunk());
      }
    }, [userData, dispatch]);

    
  return <AppRoutes />
}


export default App
