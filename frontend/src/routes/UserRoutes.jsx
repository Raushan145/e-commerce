import { Navigate, Routes, Route } from "react-router-dom";

import UserLayOut from "../layOuts/UserLayOut";

import Home from "../pages/User/Home";
import About from "../pages/User/About";
import ContactUs from "../pages/User/ContactUs";
import ProductView from "../components/ProductView";
import Cart from "../pages/User/Cart";
import WishLists from "../pages/User/WishLists";
import FAQ from "../components/FAQ";
import { useSelector } from "react-redux";
import DynamicProducts from "../components/DynamicProducts";
import MyAccount from "../components/MyAccount";
import SavedAddresses from "../pages/User/SavedAddresses";
import PasswordSecurity from "../pages/User/PasswordSecurity";

const UserRoutes = () => {
  const { userData } = useSelector((state) => state.user);
  
  return (
    <Routes>
      {/* User Layout Routes */}
      <Route element={<UserLayOut />}>
        {/* Home */}
        <Route
          path="/"
          element={ !userData || userData?.role === "user" ? (<Home />) 
            : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-account" element={userData ? <MyAccount /> : <Navigate to="/signin" replace />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlists" element={<WishLists />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/category/:categoryId" element={<DynamicProducts />} />
        <Route path="/collection/:collectionId" element={<DynamicProducts />} />
        <Route path="/new-arrivals" element={<DynamicProducts />} />
        <Route path="/recently-viewed" element={<DynamicProducts />} />

        <Route path="/my-account/saved-addresses" element={userData ? <SavedAddresses /> : <Navigate to="/signin" replace />} />
        <Route path="/my-account/password-security" element={userData ? <PasswordSecurity /> : <Navigate to="/signin" replace />} />

      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
