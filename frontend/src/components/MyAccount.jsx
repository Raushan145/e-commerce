import React, { useEffect, useRef } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  Star,
  Ticket,
  Bell,
  Lock,
  ShieldCheck,
  HelpCircle,
  LogOut,
  Trash2,
  ChevronRight,
  Edit3,
  Mail,
  Phone,
  Camera,
} from "lucide-react";
import { IoCameraOutline } from "react-icons/io5";
import {FiX } from "react-icons/fi";
import { useState } from "react";
import { getProfileThunk, updateProfileImageThunk, updateProfileThunk } from "../redux/User/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
    const [editForm, setEditForm] = useState(false)
    const [savedAddressesForm, setSavedAddressesForm] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {userData, loading, imageLoading, error,} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        dateOfBirth: "",
     });

  const imageInputRef = useRef(null);

   useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

    useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleEditProfile = () => {
        if (userData) {
        setFormData({
            name: userData.name || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            gender: userData.gender || "",
            dateOfBirth: userData.dateOfBirth
            ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
            : "",
        });
    }

    setEditForm(true);
  };

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(updateProfileThunk(formData));

        if (updateProfileThunk.fulfilled.match(result)) {
        setEditForm(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
        alert("Please select an image");
        return;
        }

        if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
        }

        await dispatch(updateProfileImageThunk(file));

        e.target.value = "";
    };

    if (loading && !userData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#a67c32] border-t-transparent" />
            </div>
        );
    }

    

  return (
    <>
   
    <div className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            My Account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your profile, orders and account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4 ">
              {/* Profile Image */}
              <div className="relative">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#f3ead7]">
                    {userData?.profileImage?.url ? (
                    <img
                        src={userData.profileImage.url}
                        alt={userData.name}
                        className="h-full w-full object-cover"
                    />
                    ) : (
                    <User size={30} className="text-[#a67c32]" />
                    )}
                </div>

            <button
                type="button"
                onClick={handleImageClick}
                disabled={imageLoading}
                className="absolute -right-1 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#a67c32] text-white shadow-sm transition hover:bg-[#8e6828] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {imageLoading ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                <Camera size={13} />
                )}
            </button>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
            />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Welcome back
                </p>

              <h2 className="mt-1 text-lg font-semibold text-gray-900">
                {userData?.name || "User"}
                </h2>

                <div className="flex flex-col gap-1 text-sm text-gray-500 sm:flex-row sm:gap-4">
                {userData?.email && (
                    <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {userData.email}
                    </span>
                )}

                {userData?.mobile && (
                    <span className="flex items-center gap-1">
                    <Phone size={14} />
                    {userData.mobile}
                    </span>
                )}
                </div>
              </div>
            </div>

            <button 
            onClick={handleEditProfile}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#b08a43] px-5 py-2.5 text-sm font-medium text-[#9a742f] transition hover:bg-[#b08a43] hover:text-white sm:w-auto">
              <Edit3 size={16} />
              Edit Profile
            </button>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          <QuickCard
            icon={<Package />}
            title="My Orders"
            subtitle="Track orders"
            path="/myOrder"
          />

          <QuickCard
            icon={<Heart />}
            title="Wishlist"
            subtitle="Saved items"
            path="/wishlists"
          />

          <QuickCard
            icon={<MapPin />}
            title="Addresses"
            subtitle="Manage addresses"
            path="/my-account/saved-addresses"
          />

          <QuickCard
            icon={<Star />}
            title="My Reviews"
            subtitle="Your reviews"
            path="/my-reviews"
          />

          <QuickCard
            icon={<Ticket />}
            title="Coupons"
            subtitle="Offers & deals"
            path="/my-coupons"
          />

          <QuickCard
            icon={<Bell />}
            title="Notifications"
            subtitle="Manage alerts"
            path="/notification"
          />

        </div>

        {/* Account Settings */}
        <div className="mt-8">

          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Account Settings
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <SettingItem
              icon={<User />}
              title="Personal Information"
              description="Update your profile details"
               onClick={handleEditProfile}
            />

            <SettingItem
              icon={<MapPin />}
              title="Saved Addresses"
              description="Manage your delivery addresses"
              path="/my-account/saved-addresses"
            />

            <SettingItem
              icon={<Lock />}
              title="Password & Security"
              description="Change password and security settings"
              path="/my-account/password-security"
            />

            <SettingItem
              icon={<Bell />}
              title="Notifications"
              description="Manage your notification preferences"
              path="/my-account/notification"
            />

            <SettingItem
              icon={<ShieldCheck />}
              title="Privacy"
              description="Control your data and privacy"
              path="/my-account/privacy"
            />

            <SettingItem
              icon={<HelpCircle />}
              title="Help & Support"
              description="Get help with your account and orders"
              path="/my-account/help&support"
            />

          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <button className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <LogOut size={18} className="text-gray-600" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Logout
              </p>
              <p className="text-xs text-gray-500">
                Sign out from your account
              </p>
            </div>

            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-red-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={18} className="text-red-500" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-red-600">
                Delete Account
              </p>
              <p className="text-xs text-gray-500">
                Permanently delete your account
              </p>
            </div>

            <ChevronRight size={18} className="text-red-300" />
          </button>

        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Your personal information is secure with us.
        </p>

      </div>
    </div>

    {editForm && (
    <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-0 py-0 backdrop-blur-[3px] sm:px-4 sm:py-6"
        onClick={() => setEditForm(false)}
    >
        <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full overflow-hidden bg-white sm:h-auto sm:max-h-[90vh] sm:max-w-[520px] sm:rounded-2xl sm:border sm:border-gray-100 sm:shadow-2xl"
        >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 bg-[#fffdfa] px-5 py-4 sm:px-6">
            <div>
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#a67c32]">
                My Account
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#293b25]">
                Edit Profile
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
                Update your personal information
            </p>
            </div>

            <button
            type="button"
            onClick={() => setEditForm(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
            <FiX size={18} />
            </button>
        </div>

        {/* Form */}

        <form
            onSubmit={handleSubmit}
            className="h-[calc(100%-78px)] overflow-y-auto px-5 py-5 sm:h-auto sm:max-h-[calc(90vh-78px)] sm:px-6"
        >
            {/* Profile Image */}

            <div className="mb-6 flex flex-col items-center">
            <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#f8f1e3] bg-[#f3ead7] shadow-sm">
                {userData?.profileImage?.url ? (
                    <img
                    src={userData.profileImage.url}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                    />
                ) : (
                    <User size={38} className="text-[#a67c32]" />
                )}
                </div>

                <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#a67c32] text-white shadow-md transition hover:bg-[#8e6828]"
                >
                <Camera size={15} />
                </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
                Use camera button to update image
            </p>
            </div>

            {/* Fields */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Name */}

            <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Full Name
                </label>

                <div className="relative">
                <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
                />
                </div>
            </div>

            {/* Email */}

            <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Email Address
                </label>

                <div className="relative">
                <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
                />
                </div>
            </div>

            {/* Mobile */}

            <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Mobile Number
                </label>

                <div className="relative">
                <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
                />
                </div>
            </div>

            {/* Gender */}

            <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Gender
                </label>

                <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
                >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>

            {/* DOB */}

            <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Date of Birth
                </label>

                <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
                />
            </div>
            </div>

            {/* Security */}

            <div className="mt-5 rounded-lg border border-[#eee5d2] bg-[#fffaf0] px-3.5 py-3">
            <div className="flex gap-2">
                <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-[#a67c32]"
                />

                <p className="text-[11px] leading-5 text-gray-500">
                Your personal information is protected and will only be used to
                manage your Swarnika account.
                </p>
            </div>
            </div>

            {/* Buttons */}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
                type="button"
                onClick={() => setEditForm(false)}
                className="h-11 rounded-lg border border-gray-200 px-6 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-lg bg-[#293b25] px-7 text-sm font-medium text-white shadow-sm transition hover:bg-[#1f2d1c] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
            </div>
        </form>
        </div>
    </div>
    )}

     </>
  );
};

// Quick Action Card

const QuickCard = ({ icon, title, subtitle, path}) => {
    const navigate = useNavigate()
  return (
    <button onClick={() => navigate(path)}  className="group rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#c5a15b] hover:shadow-md">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f1e3] text-[#a67c32] transition group-hover:bg-[#b08a43] group-hover:text-white">
        {React.cloneElement(icon, { size: 19 })}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-[11px] text-gray-500">
        {subtitle}
      </p>

    </button>
  );
};

// Setting Item

const SettingItem = ({ icon, title, description, path, onClick }) => {
    const navigate = useNavigate()
    const handleClick = () =>{
      if(onClick){
        onClick()
      }else if(path){
        navigate(path)
      }
    }
  return (
    <button onClick={handleClick} className="group flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left last:border-b-0 transition hover:bg-[#fcfaf5]">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f1e3] text-[#a67c32]">
        {React.cloneElement(icon, { size: 18 })}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-xs text-gray-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#a67c32]"
      />

    </button>
  );
};

export default MyAccount;