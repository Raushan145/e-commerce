import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/Auth/Signin";
import SignUp from "../pages/Auth/Signup";
import UserRoutes from "./UserRoutes";
import OwnerRoutes from "./OwnerRoutes";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const {userData} = useSelector((state) => state.user)
  return (
    <Routes>
      <Route path="/signin" element={ userData ? (  userData.role === "owner" ? ( <Navigate to="/owner/dashboard" replace /> ) : ( <Navigate to="/" replace /> )) : ( <SignIn />) }/>   
      <Route path="/signup" element={ userData ? (  userData.role === "owner" ? ( <Navigate to="/owner/dashboard" replace /> ) : ( <Navigate to="/" replace /> )) : ( <SignUp />) }/>      
     {/* <Route path="/signup" element={!userData ? (<SignUp />) : userData.role === "owner" ? (<OwnerRoutes /> ): (<UserRoutes /> )} /> */}
      {/* <Route path="/signup" element={!userData ? (<SignUp />) : userData.role === "owner" ? (<OwnerRoutes /> ): (<UserRoutes /> )} /> */}
      <Route path="/owner/*" element={<OwnerRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
};

export default AppRoutes;