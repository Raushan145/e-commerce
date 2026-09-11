import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  Phone,
  User,
  MoreVertical,
  Home,
  Briefcase,
  MapPinned,
} from "lucide-react";

import { createAddress, deleteAddress, getMyAddresses, setDefaultAddress, updateAddress } from "../../redux/address/addressThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearAddressMessage } from "../../redux/address/addressSlice";

const SavedAddresses = () => {
//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       type: "Home",
//       icon: Home,
//       name: "Raushan Kumar",
//       phone: "+91 98765 43210",
//       address:
//         "123, ABC Colony, Near Main Road, Bhopal, Madhya Pradesh",
//       pincode: "462001",
//       isDefault: true,
//     },
//     {
//       id: 2,
//       type: "Work",
//       icon: Briefcase,
//       name: "Raushan Kumar",
//       phone: "+91 98765 43210",
//       address:
//         "Office No. 204, Tech Park, MP Nagar, Bhopal, Madhya Pradesh",
//       pincode: "462011",
//       isDefault: false,
//     },
//     {
//       id: 3,
//       type: "Other",
//       icon: MapPinned,
//       name: "Raushan Kumar",
//       phone: "+91 98765 43210",
//       address:
//         "Village Post - Kolar, Tehsil - Bhopal, Madhya Pradesh",
//       pincode: "462042",
//       isDefault: false,
//     },
//   ]);
  const {loading,error,success, addresses} = useSelector((state) => state.address)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyAddresses());
  }, [dispatch]);

  
  useEffect(() => {
  if (!success && !error) return;

  const timer = setTimeout(() => {
    dispatch(clearAddressMessage());
  }, 5000);

  return () => clearTimeout(timer);
}, [success, error, dispatch]);


  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (confirmDelete) {
     dispatch(deleteAddress(id))
    }
  };

  const handleSetDefault = (id) => {
     dispatch(setDefaultAddress(id))
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-7 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-[#b08a43] hover:text-[#a07832]"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Saved Addresses
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your delivery addresses
              </p>
            </div>
          </div>

          {/* Desktop Add Button */}
          <button
            onClick={handleAdd}
            className="hidden items-center gap-2 rounded-xl bg-[#b08a43] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#96722f] sm:flex"
          >
            <Plus size={18} />
            Add New Address
          </button>
        </div>

        {/* ================= MOBILE ADD ================= */}
        <button
          onClick={handleAdd}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b08a43] py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#96722f] sm:hidden"
        >
          <Plus size={18} />
          Add New Address
        </button>

        {/* ================= ADDRESS COUNT ================= */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            {addresses.length} Saved Address
            {addresses.length !== 1 && "es"}
          </p>

          <p className="hidden text-xs text-gray-400 sm:block">
            Select a default address for faster checkout
          </p>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {/* ================= ADDRESS GRID ================= */}
        {addresses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">

            {addresses.map((address) => {
              const Icon =
                address.addressType === "Home"
                  ? Home
                  : address.addressType === "Work"
                  ? Briefcase
                  : MapPinned;

              return (
                <div
                  key={address._id}
                  className={`group relative overflow-hidden rounded-2xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    address.isDefault
                      ? "border-[#c8a45c]"
                      : "border-gray-200"
                  }`}
                >

                  {/* Default Top Line */}
                  {address.isDefault && (
                    <div className="h-1 bg-[#b08a43]" />
                  )}

                  <div className="p-5 sm:p-6">

                    {/* Card Header */}
                    <div className="mb-5 flex items-start justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f1e3] text-[#a07832]">
                          <Icon size={20} strokeWidth={1.8} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold text-gray-900">
                              {address.type}
                            </h2>

                            {address.isDefault && (
                              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
                                <Check size={11} />
                                Default
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Delivery address
                          </p>
                        </div>
                      </div>

                      {/* Mobile Menu */}
                      <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 sm:hidden">
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-3">

                      {/* Name */}
                      <div className="flex items-start gap-3">
                        <User
                          size={16}
                          className="mt-0.5 shrink-0 text-gray-400"
                        />

                        <p className="text-sm font-medium text-gray-800">
                          {address.fullName}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-gray-400"
                        />

                        <p className="text-sm leading-6 text-gray-600">
                          {address.addressLine1 || address?.addressLine2}, {" "}
                          <span className="font-medium text-gray-600">
                           {address?.city}, {address?.state}, {address?.country}, {address.pincode}
                          </span>
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <Phone
                          size={16}
                          className="shrink-0 text-gray-400"
                        />

                        <p className="text-sm text-gray-600">
                          {address.mobile}
                        </p>
                      </div>

                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-100" />

                    {/* Actions */}
                    <div className="flex items-center justify-between">

                      <div>
                        {!address.isDefault && (
                          <button
                            onClick={() =>
                              handleSetDefault(address._id)
                            }
                            className="text-xs font-medium text-[#9a742f] transition hover:underline"
                          >
                            Set as Default
                          </button>
                        )}

                        {address.isDefault && (
                          <span className="text-xs text-green-600">
                            ✓ Default delivery address
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => handleEdit(address)}
                          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-[#b08a43] hover:text-[#9a742f]"
                        >
                          <Pencil size={14} />
                          <span className="hidden xs:inline">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDelete(address._id)}
                          className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          <span className="hidden xs:inline">
                            Delete
                          </span>
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f1e3] text-[#a07832]">
              <MapPin size={28} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Add your home, work or other delivery address for
              faster checkout.
            </p>

            <button
              onClick={handleAdd}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b08a43] px-5 py-3 text-sm font-medium text-white hover:bg-[#96722f]"
            >
              <Plus size={17} />
              Add New Address
            </button>
          </div>
        )}

        {/* ================= INFO ================= */}
        <div className="mt-7 rounded-xl border border-[#eadfc8] bg-[#fcf8ef] p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2e7d0] text-[#a07832]">
              <MapPin size={16} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Address tip
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Keep your address and phone number updated to avoid
                delivery delays.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <AddressModal
          address={editingAddress}
          onClose={() => {
            setShowModal(false);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
};


/* =====================================================
   ADDRESS MODAL
===================================================== */

const AddressModal = ({ address, onClose }) => {
  const [form, setForm] = useState({
    addressType: address?.addressType || "Home",
    fullName: address?.fullName || "",
    mobile: address?.mobile || "",
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "",
    city: address?.city || "",
    state: address?.state ||"",
    pincode: address?.pincode || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address:", form);

    dispatch(updateAddress({id:address?._id, addressData:form}))
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">

      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-2xl sm:p-7">

        {/* Modal Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {address ? "Edit Address" : "Add New Address"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Enter your delivery details
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

       

          {/* Name + Phone */}
          <div className="grid gap-4 sm:grid-cols-2">

            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />

            <Input
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              required
            />

          </div>

          {/* Address */}
          <Input
            label="Address Line 1"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="House / Flat / Building"
            required
          />

          <Input
            label="Address Line 2"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            placeholder="Street / Area / Landmark"
          />

          {/* City State Pincode */}
          <div className="grid gap-4 sm:grid-cols-3">

            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Bhopal"
              required
            />

            <Input
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Madhya Pradesh"
              required
            />

            <Input
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="462001"
              required
            />

          </div>

             {/* Address Type */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Address Type
            </label>

            <div className="grid grid-cols-3 gap-2">

              {["Home", "Work", "Other"].map((addressType) => (
                <button
                  key={addressType}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, addressType })
                  }
                  className={`rounded-xl border py-3 text-sm font-medium transition ${
                    form.addressType === addressType
                      ? "border-[#b08a43] bg-[#fbf5e8] text-[#9a742f]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {addressType}
                </button>
              ))}

            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#b08a43] py-3 text-sm font-medium text-white shadow-sm hover:bg-[#96722f]"
            >
              {address ? "Save Changes" : "Save Address"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};


// INPUT COMPONENT

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#b08a43] focus:ring-2 focus:ring-[#b08a43]/10"
      />
    </div>
  );
};

export default SavedAddresses;