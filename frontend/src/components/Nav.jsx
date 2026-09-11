import { useState } from "react";
import {
  IoMdHeartEmpty,
  IoIosSearch,
} from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import {
  FiMenu,
  FiX,
  FiUser,
  FiPackage,
  FiHeart,
  FiGrid,
  FiLayers,
  FiStar,
  FiClock,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiChevronDown,
  FiSettings,
} from "react-icons/fi";

// import {
//   FiMenu,
//   FiBell,
//   FiLogOut,
//   FiUser,
// } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutThunk } from "../redux/User/userThunk";
import { useRef } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated,
  );

  const userData = useSelector(
    (state) => state.user.userData,
  );

  const { cartItems = [] } = useSelector(
    (state) => state.cart,
  );
  const {wishlistItems} = useSelector((state) => state.wishlist)

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const goTo = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleAccount = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    dispatch(signoutThunk());
    navigate("/signin", { replace: true });
  };

  // ================= LOGOUT =================
    const handleLogout = async () => {
      setProfileOpen(false);
      await dispatch(signoutThunk()).unwrap();
      navigate("/signin", { replace: true });
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

  // const handleLogout = async () => {
  //   await dispatch(signoutThunk());
  //   closeMenu();
  //   navigate("/signin", { replace: true });
  // };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md">

        <nav className="border-b border-[#eeeae2]">

          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

            {/* =================================================
                MOBILE SEARCH
            ================================================= */}

            {showSearch ? (
              <div className="flex h-[72px] items-center gap-3 md:hidden">

                <div
                  className="
                    flex h-11 flex-1 items-center
                    overflow-hidden rounded-full
                    border border-[#ddd8ce]
                    bg-[#faf9f6]
                    transition
                    focus-within:border-[#293b25]
                  "
                >

                  <IoIosSearch
                    size={21}
                    className="ml-4 shrink-0 text-gray-500"
                  />

                  <input
                    autoFocus
                    type="text"
                    placeholder="Search jewellery..."
                    className="
                      h-full w-full
                      bg-transparent
                      px-3
                      text-sm
                      text-gray-700
                      outline-none
                      placeholder:text-gray-400
                    "
                  />

                </div>

                <button
                  onClick={() => setShowSearch(false)}
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-[#f6f4ef]
                    text-gray-600
                    transition
                    hover:bg-[#293b25]
                    hover:text-white
                  "
                >
                  <FiX size={20} />
                </button>

              </div>
            ) : (

              /* =================================================
                 NORMAL NAVBAR
              ================================================= */

              <div className="flex h-[74px] items-center justify-between gap-4">

                {/* ================= LOGO ================= */}

                <button
                  onClick={() => navigate("/")}
                  className="shrink-0 text-left select-none"
                >

                  <h1
                    className="
                      text-[21px]
                      font-semibold
                      tracking-[4px]
                      text-[#293b25]
                      sm:text-[25px] 
                    "
                  >
                    SWARNIKA
                  </h1>

                  <p
                    className="
                      mt-0.5
                      text-center
                      text-[7px]
                      tracking-[4px]
                      text-[#9a968c]
                      sm:text-[8px]
                    "
                  >
                    FASHION STORE
                  </p>

                </button>

                {/* ================= DESKTOP SEARCH ================= */}

                <div className="hidden max-w-xl flex-1 md:flex">

                  <div
                    className="
                      flex h-11 w-full
                      items-center
                      overflow-hidden
                      rounded-full
                      border border-[#dedad2]
                      bg-[#faf9f6]
                      transition
                      focus-within:border-[#293b25]
                      focus-within:bg-white
                    "
                  >

                    <IoIosSearch
                      size={21}
                      className="ml-4 text-gray-500"
                    />

                    <input
                      type="text"
                      placeholder="Search products, brands and more"
                      className="
                        h-full w-full
                        bg-transparent
                        px-3
                        text-sm
                        text-gray-700
                        outline-none
                        placeholder:text-gray-400
                      "
                    />

                  </div>

                </div>

                {/* ================= RIGHT ICONS ================= */}

                <div className="flex items-center gap-5 sm:gap-7">

                  {/* Mobile Search */}

                  <button
                    onClick={() => setShowSearch(true)}
                    className="
                      flex flex-col
                      items-center
                      text-gray-700
                      transition
                      hover:text-[#293b25]
                      md:hidden
                    "
                  >

                    <IoIosSearch size={23} />

                    <span className="mt-0.5 text-[9px]">
                      Search
                    </span>

                  </button>

                  {/* Wishlist */}

                  <button
                    onClick={() => navigate("/wishlists")}
                    className="
                      hidden
                      flex-col
                      items-center
                      text-gray-700
                      transition
                      hover:text-[#293b25]
                      md:flex
                    "
                  >

                    <div className="relative">

                      <IoMdHeartEmpty size={24} />

                      {wishlistItems.length > 0 && (
                        <span
                          className="
                            absolute -right-2 -top-2
                            flex h-4 min-w-4
                            items-center justify-center
                            rounded-full
                            bg-[#293b25]
                            px-1
                            text-[8px]
                            font-semibold
                            text-white
                          "
                        >
                          {wishlistItems.length}
                        </span>
                      )}

                    </div>

                    <span className="mt-1 text-[10px]">
                      Wishlist
                    </span>

                  </button>

               

                  {/* Cart */}

                  <button
                    onClick={() => navigate("/cart")}
                    className="
                      flex flex-col
                      items-center
                      text-gray-700
                      transition
                      hover:text-[#293b25]
                    "
                  >

                    <div className="relative">

                      <IoCartOutline size={24} />

                      {cartItems.length > 0 && (
                        <span
                          className="
                            absolute -right-2.5 -top-2.5
                            flex h-[17px] min-w-[17px]
                            items-center justify-center
                            rounded-full
                            bg-[#293b25]
                            px-1
                            text-[8px]
                            font-bold
                            text-white
                          "
                        >
                          {cartItems.length}
                        </span>
                      )}

                    </div>

                    <span className="mt-1 text-[10px]">
                      Cart
                    </span>

                  </button>

                     {/* Account */}

                  <button
                    // onClick={()=> setProfileOpen((prev) => !prev)}
                    onClick={() => setShowMenu(true)}
                    className="
                      hidden
                      flex-col
                      items-center
                      text-gray-700
                      transition
                      hover:text-[#293b25]
                      md:flex
                    "
                  >

                    <FiUser size={22} />

                    <span className="mt-1 text-[10px]">
                     Account
                    </span>

                  </button>

                  {/* Hamburger */}

                  <button
                    onClick={() => setShowMenu(true)}
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-[#f6f4ef]
                      text-[#293b25]
                      transition
                      hover:bg-[#293b25]
                      hover:text-white
                      md:hidden
                    "
                    aria-label="Open menu"
                  >
                    <FiMenu size={21} />
                  </button>

                <div
                      ref={profileRef}
                      className="relative"
                    >
            
                      {/* PROFILE BUTTON */}
            
            
            
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

              </div>
            )}

          </div>

        </nav>


      </header>


      {/* =====================================================
          MOBILE DRAWER OVERLAY
      ===================================================== */}

      {showMenu && (
        <div
          className="
            fixed inset-0 z-[100]
            bg-black/40
            backdrop-blur-[2px]
           
          "
          onClick={closeMenu}
        >

          {/* =================================================
              DRAWER
          ================================================= */}

          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-[85%] max-w-[360px] flex-col bg-[#fffdfa]
              shadow-2xl
              animate-[slideIn_0.3s_ease-out]
            "
          >

            {/* ================= DRAWER HEADER ================= */}

            <div className="flex items-center justify-between border-b border-[#eeeae2] px-5 py-5">
              <div>

                <button onClick={()=> navigate("/")} className=" text-lg font-semibold tracking-[3px] text-[#293b25]">
                  SWARNIKA
                </button>

                <p className=" mt-0.5 text-[7px] tracking-[3px] text-gray-400">
                  FASHION STORE
                </p>

              </div>

              <button onClick={closeMenu} className=" flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f2eb] text-gray-600 transition hover:bg-[#293b25] hover:text-white">
                <FiX size={19} />
              </button>

            </div>

            {/* ================= PROFILE ================= */}

            <div className="border-b border-[#eeeae2] px-5 py-5">

              <button
                onClick={() =>
                  isAuthenticated
                    ? goTo("/my-account")
                    : goTo("/signin")
                }
                className="
                  flex w-full
                  items-center
                  gap-3
                  rounded-xl
                  bg-[#f6f3ec]
                  p-3 cursor-pointer
                  text-left
                "
              >

                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#293b25] text-white">
                    {userData?.profileImage?.url ? (
                      <img
                        src={userData.profileImage.url}
                        alt={userData?.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser size={19} />
                    )}
                  </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-semibold text-[#293b25]">
                    {isAuthenticated
                      ? "My Account"
                      : "Welcome to Swarnika"}
                  </p>

                  <p className="mt-0.5 truncate text-[9px] text-gray-500">
                    {isAuthenticated
                      ? "View your profile"
                      : "Sign in to continue shopping"}
                  </p>

                </div>

                <FiChevronRight
                  size={16}
                  className="text-gray-400"
                />

              </button>

            </div>


            {/* ================= MENU ================= */}

            <div className="flex-1 overflow-y-auto px-5 py-4">

              
              <p
                className="
                  mb-2
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-gray-400
                "
              >
                My Shopping
              </p>

              <MobileMenuItem
                icon={<FiHeart />}
                title="Wishlist"
                badge={wishlistItems.length}
                onClick={() => goTo("/wishlists")}
              />

              <MobileMenuItem
                icon={<IoCartOutline />}
                title="My Cart"
                badge={cartItems.length}
                onClick={() => goTo("/cart")}
              />

              {isAuthenticated && (
                <MobileMenuItem
                  icon={<FiPackage />}
                  title="My Orders"
                  onClick={() => goTo("/my-orders")}
                />
              )}

              <MobileMenuItem
                icon={<FiClock />}
                title="Recently Viewed"
                onClick={() => goTo("/recently-view")}
              />


              <div className="my-4 h-px bg-[#eeeae2]" />

              <p
                className="
                  mb-2
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-gray-400
                "
              >
                Explore
              </p>

              <MobileMenuItem
                icon={<FiGrid />}
                title="Categories"
                onClick={() => goTo("/category")}
              />

              <MobileMenuItem
                icon={<FiLayers />}
                title="Collections"
                onClick={() => goTo("/collection")}
              />

              <MobileMenuItem
                icon={<FiStar />}
                title="New Arrivals"
                onClick={() => goTo("/new-arrivals")}
              />

              <MobileMenuItem
                icon={<FiPackage />}
                title="Shop All Products"
                onClick={() => goTo("/all-products")}
              />


              <div className="my-4 h-px bg-[#eeeae2]" />

              <p
                className="
                  mb-2
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-gray-400
                "
              >
                Support
              </p>

              <MobileMenuItem
                icon={<FiHelpCircle />}
                title="Help & Support"
                onClick={() => goTo("/contact")}
              />

              <MobileMenuItem
                icon={<FiUser />}
                title="About Us"
                onClick={() => goTo("/about")}
              />

            </div>


            {/* ================= FOOTER ACTION ================= */}

            <div className="border-t border-[#eeeae2] px-5 py-2">

              {isAuthenticated ? (

                <button
                  onClick={handleLogout}
                  className="
                    flex w-full
                    items-center justify-center
                    gap-2
                    rounded-lg
                    border border-red-200
                    py-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[1px]
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >

                  <FiLogOut size={15} />

                  Logout

                </button>

              ) : (

                <button
                  onClick={() => goTo("/signin")}
                  className="
                    flex w-full
                    items-center justify-center
                    gap-2
                    rounded-lg
                    bg-[#293b25]
                    py-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[1px]
                    text-white
                    transition
                    hover:bg-[#1d2c1a]
                  "
                >

                  <FiUser size={15} />

                  Sign In

                </button>

              )}

              <p
                className="
                  mt-3
                  text-center
                  text-[8px]
                  tracking-[1px]
                  text-gray-400
                "
              >
                Crafted for timeless elegance
              </p>

            </div>

          </aside>

        </div>
      )}


      {/* ================= DRAWER ANIMATION ================= */}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

    </>
  );
};


/* ============================================================
   MOBILE MENU ITEM
============================================================ */

const MobileMenuItem = ({
  icon,
  title,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex w-full
        items-center
        gap-3
        rounded-lg
        px-2
        py-3
        text-left
        transition
        hover:bg-[#f6f3ec]
      "
    >

      <span
        className="
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-lg
          bg-[#f5f2eb]
          text-[#293b25]
          transition
          group-hover:bg-[#293b25]
          group-hover:text-white
        "
      >
        {icon}
      </span>

      <span className="flex-1 text-xs font-medium text-[#37352f]">
        {title}
      </span>

      {badge > 0 && (
        <span
          className="
            flex h-5 min-w-5
            items-center justify-center
            rounded-full
            bg-[#293b25]
            px-1.5
            text-[8px]
            font-semibold
            text-white
          "
        >
          {badge}
        </span>
      )}

      <FiChevronRight
        size={15}
        className="
          text-gray-300
          transition
          group-hover:text-[#293b25]
        "
      />

    </button>
  );
};

export default Nav;