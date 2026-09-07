import React from "react";
import { Outlet } from "react-router-dom";
import Announcement from "../components/Announcement";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const UserLayOut = () => {

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Announcement */}
      <Announcement />

      {/* Navbar */}
      <Nav />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default UserLayOut;
