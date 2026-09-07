import React, { useEffect, useRef, useState } from "react";
import {
  FiMenu,
  FiBell,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerNavbar = ({ onMenuClick }) => {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ================= CLOSE DROPDOWN OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    setProfileOpen(false);

    // Later logout thunk yaha call karenge
    console.log("Owner Logout");

    navigate("/login");
  };

  // ================= PROFILE =================
  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/owner/profile");
  };

  // ================= SETTINGS =================
  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/owner/settings");
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-[64px]

        bg-white/95
        backdrop-blur-xl

        border-b
        border-gray-200

        flex
        items-center
        justify-between

        px-4
        sm:px-6
        lg:px-7

        shadow-[0_2px_15px_rgba(0,0,0,0.04)]
      "
    >

      {/* ===================================================== */}
      {/* LEFT SECTION */}
      {/* ===================================================== */}

      <div className="flex items-center gap-4">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-lg
            text-gray-600
            hover:bg-[#f5f5f2]
            hover:text-[#293b25]
            transition
          "
        >
          <FiMenu size={21} />
        </button>

        {/* BRAND */}
        <div className="leading-none">

          <h1
            className="
              font-serif
              text-[20px]
              sm:text-[22px]
              font-semibold
              tracking-[2px]
              text-[#293b25]
            "
          >
            SWARNIKA
          </h1>

          <p
            className="
              text-[7px]
              sm:text-[8px]
              tracking-[3px]
              text-[#a09d94]
              mt-1
            "
          >
            OWNER PANEL
          </p>

        </div>

      </div>


      {/* ===================================================== */}
      {/* RIGHT SECTION */}
      {/* ===================================================== */}

      <div className="flex items-center gap-2 sm:gap-3">

        {/* ================= NOTIFICATION ================= */}

        <button
          className="
            relative
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-full

            flex
            items-center
            justify-center

            text-gray-600

            hover:bg-[#f5f5f2]
            hover:text-[#293b25]

            transition
          "
        >

          <FiBell size={18} />

          {/* Notification dot */}
          <span
            className="
              absolute
              top-[7px]
              right-[7px]

              w-[7px]
              h-[7px]

              rounded-full
              bg-[#c9a96e]

              border-2
              border-white
            "
          />

        </button>


        {/* ================= PROFILE ================= */}

        <div
          ref={profileRef}
          className="relative"
        >

          {/* PROFILE BUTTON */}

          <button
            onClick={() =>
              setProfileOpen((prev) => !prev)
            }
            className="
              flex
              items-center
              gap-2

              px-1.5
              sm:px-2
              py-1.5

              rounded-xl

              hover:bg-[#f7f7f4]

              transition
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10

                rounded-full

                bg-[#293b25]

                text-white

                flex
                items-center
                justify-center

                shadow-sm
              "
            >
              <FiUser size={17} />
            </div>


            {/* USER INFO */}

            <div className="hidden sm:block text-left max-w-[130px]">

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#293b25]

                  truncate
                "
              >
                {userData?.name || "Owner Name"}
              </p>

              <p
                className="
                  text-[10px]
                  text-gray-400

                  truncate
                "
              >
                {userData?.email || "owner@email.com"}
              </p>

            </div>


            {/* CHEVRON */}

            <FiChevronDown
              size={15}
              className={`
                hidden sm:block
                text-gray-400
                transition-transform
                duration-200
                ${profileOpen ? "rotate-180" : ""}
              `}
            />

          </button>


          {/* ================================================= */}
          {/* PROFILE DROPDOWN */}
          {/* ================================================= */}

          {profileOpen && (

            <div
              className="
                absolute
                right-0
                top-[52px]

                w-[280px]

                bg-white

                border
                border-gray-200

                rounded-2xl

                shadow-[0_15px_45px_rgba(0,0,0,0.12)]

                overflow-hidden

                animate-[fadeIn_.15s_ease-out]
              "
            >

              {/* ================= USER HEADER ================= */}

              <div
                className="
                  p-4
                  md:hidden block
                  bg-[#fafaf7]

                  border-b
                  border-gray-100
                "
              >

                <div className="flex items-center gap-3 ">

                  {/* Avatar */}

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full

                      bg-[#293b25]

                      text-white

                      flex
                      items-center
                      justify-center

                      flex-shrink-0
                    "
                  >
                    <FiUser size={21} />
                  </div>


                  {/* Details */}

                  <div className="min-w-0">

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-[#293b25]

                        truncate
                      "
                    >
                      {userData?.name || "Owner Name"}
                    </h3>

                    <p
                      className="
                        text-[11px]
                        text-gray-500

                        truncate
                      "
                    >
                      {userData?.email || "owner@email.com"}
                    </p>

                    <span
                      className="
                        inline-block
                        mt-1

                        px-2
                        py-[2px]

                        rounded-full

                        bg-[#293b25]/10
                        text-[#293b25]

                        text-[8px]
                        uppercase
                        tracking-[1px]
                        font-medium
                      "
                    >
                      {userData?.role || "Owner"}
                    </span>

                  </div>

                </div>

              </div>


              {/* ================= MENU ================= */}

              <div className="p-2">

                {/* Profile */}

                <button
                  onClick={handleProfile}
                  className="
                    w-full

                    flex
                    items-center
                    gap-3

                    px-3
                    py-2.5

                    rounded-xl

                    text-left

                    text-sm
                    text-gray-600

                    hover:bg-[#f5f5f2]
                    hover:text-[#293b25]

                    transition
                  "
                >

                  <FiUser size={17} />

                  <div>
                    <p className="text-xs font-medium">
                      My Profile
                    </p>

                    <p className="text-[9px] text-gray-400">
                      View and edit your profile
                    </p>
                  </div>

                </button>


                {/* Settings */}

                <button
                  onClick={handleSettings}
                  className="
                    w-full

                    flex
                    items-center
                    gap-3

                    px-3
                    py-2.5

                    rounded-xl

                    text-left

                    text-sm
                    text-gray-600

                    hover:bg-[#f5f5f2]
                    hover:text-[#293b25]

                    transition
                  "
                >

                  <FiSettings size={17} />

                  <div>
                    <p className="text-xs font-medium">
                      Settings
                    </p>

                    <p className="text-[9px] text-gray-400">
                      Manage account settings
                    </p>
                  </div>

                </button>

              </div>


              {/* ================= LOGOUT ================= */}

              <div
                className="
                  border-t
                  border-gray-100
                  p-2
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

                    rounded-xl

                    text-left

                    text-red-500

                    hover:bg-red-50

                    transition
                  "
                >

                  <FiLogOut size={17} />

                  <div>

                    <p className="text-xs font-medium">
                      Logout
                    </p>

                    <p className="text-[9px] text-red-400">
                      Sign out from owner panel
                    </p>

                  </div>

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default OwnerNavbar;