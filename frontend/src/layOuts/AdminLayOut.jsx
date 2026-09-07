import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import OwnerNavbar from "../components/Owner/OwnerNavbar";
import OwnerSidebar from "./OwnerSidebar";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* Navbar */}
      <OwnerNavbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">

        {/* Sidebar */}
        <OwnerSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main
          className="
            flex-1
            min-w-0
            pt-[45px]
            lg:ml-[230px]
            min-h-screen
          "
        >
          <div className="p-4 sm:p-6 lg:p-7">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};

export default OwnerLayout;