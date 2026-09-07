import { Navigate, Routes, Route } from "react-router-dom";
import AdminLayOut from "../layOuts/AdminLayOut";

import Dashboard from "../pages/Admin/Dashboard";
import Collections from "../pages/Admin/Collections";

import { useSelector } from "react-redux";
import OwnerOrder from "../pages/Admin/OwnerOrder";
import Customers from "../pages/Admin/Customers";
import Coupons from "../pages/Admin/Coupons";
import Products from "../pages/Admin/Products";
import Categories from "../pages/Admin/Categories";
import AdminBanner from "../pages/Admin/AdminBanner";


const OwnerRoutes = () => {
   const { userData, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <div className="min-h-screen grid place-items-center">Loading...</div>;
  }

  const isOwner = userData?.role?.toLowerCase() === "owner";

  return (
    <Routes>

        {/* Admin Layout Routes */}
        <Route element={<AdminLayOut />}>

        {/* Home */}
        <Route index element={isOwner ? <Dashboard /> : <Navigate to="/signin" replace />} />
        <Route path="dashboard" element={isOwner ? <Dashboard /> : <Navigate to="/signin" replace />} />
        <Route path="orders" element={isOwner ? <OwnerOrder /> : <Navigate to="/signin" replace />} />
        <Route path="collections" element={isOwner ? <Collections /> : <Navigate to="/signin" replace />} />
        <Route path="products" element={isOwner ? <Products /> : <Navigate to="/signin" replace />} />
        <Route path="categories" element={isOwner ? <Categories /> : <Navigate to="/signin" replace />} />
        <Route path="customers" element={isOwner ? <Customers /> : <Navigate to="/signin" replace />} />
        <Route path="coupons" element={isOwner ? <Coupons /> : <Navigate to="/signin" replace />} />
        <Route path="banners" element={isOwner ? <AdminBanner /> : <Navigate to="/signin" replace />} />
        <Route path="settings" element={isOwner ? <Dashboard /> : <Navigate to="/signin" replace />} />

      </Route>

      <Route path="*" element={<Navigate to="/owner" replace />} />

    </Routes>
  );
};

export default OwnerRoutes;