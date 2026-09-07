import React from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiPackage,
  FiPlusCircle,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { CiDiscount1 } from "react-icons/ci";

import { NavLink, useNavigate } from "react-router-dom";

const OwnerSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: FiGrid,
    },
    {
      name: "Orders",
      path: "/owner/orders",
      icon: FiShoppingBag,
    },
    {
      name: "Products",
      path: "/owner/products",
      icon: FiPackage,
    },
    {
      name: "Collections",
      path: "/owner/collections",
      icon: FiPackage,
    },
    {
      name: "Category",
      path: "/owner/categories",
      icon: FiPackage,
    },
    {
      name: "Customers",
      path: "/owner/customers",
      icon: FiUser,
    },
    {
      name: "Coupons",
      path: "/owner/coupons",
      icon: CiDiscount1,
    },
    {
      name: "Banners",
      path: "/owner/banners",
      icon: FiUser,
    },
    {
      name: "Settings",
      path: "/owner/settings",
      icon: FiSettings,
    },
  ];

  const handleLogout = () => {
    console.log("Owner Logout");

    // logout thunk yaha call karenge

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-[250px]
          h-screen
          bg-white
          border-r
          border-gray-200
          transition-transform
          duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div
          className="
            h-[64px]
            flex
            items-center
            justify-between
            px-5
            border-b
            border-gray-200
          "
        >

          <div>
            <h2 className="font-serif text-lg font-semibold text-[#293b25]">
              SWARNIKA
            </h2>

            <p className="text-[8px] tracking-[2px] text-gray-400">
              OWNER PANEL
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Menu */}
        <nav className="px-3 py-2 space-y-1">

          <p
            className="
              px-3
              mb-2
              text-[9px]
              uppercase
              tracking-[1.5px]
              text-gray-400
            "
          >
            Main Menu
          </p>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/owner"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2.5
                  rounded-lg
                  text-sm
                  transition
                  ${
                    isActive
                      ? "bg-[#293b25] text-white"
                      : "text-gray-600 hover:bg-[#f5f5f2] hover:text-[#293b25]"
                  }
                `}
              >
                <Icon size={17} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </nav>

        {/* Bottom */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-3
            border-t
            border-gray-200
          "
        >

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-sm
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            <FiLogOut size={17} />

            Logout
          </button>

        </div>

      </aside>
    </>
  );
};

export default OwnerSidebar;