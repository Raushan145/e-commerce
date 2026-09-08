import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserThunk } from './redux/User/userThunk';
import { getCollectionsThunk } from './redux/collections/collectionThunk';
import { getCategoriesThunk } from './redux/category/categoryThunk';
import { getAllProductsThunk, getNewArrivalProductThunk, getProductsThunk } from './redux/Product/productThunk';

export const ServerURL = "https://e-commerce-backend-6mkz.onrender.com";
// export const ServerURL = "http://localhost:8080";

const App = () => {

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getCurrentUserThunk());
    dispatch(getCollectionsThunk());
    dispatch(getCategoriesThunk());
    dispatch(getNewArrivalProductThunk());
    dispatch(getAllProductsThunk())
    // dispatch(getProductsThunk())
  }, [dispatch]);
  return <AppRoutes />
}


export default App
