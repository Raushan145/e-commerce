import React, { useEffect, useState } from "react";

import {
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiX,
  FiCalendar,
  FiPercent,
  FiCheck,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import {
  getCouponsThunk,
  createCouponThunk,
  updateCouponThunk,
  deleteCouponThunk,
  toggleCouponThunk,
} from "../../redux/Coupon/couponThunk";


const Coupons = () => {

  const dispatch = useDispatch();

  const {
    coupons,
    loading,
  } = useSelector(
    (state) => state.coupon
  );


  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [openMenu, setOpenMenu] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [editingCoupon, setEditingCoupon] =
    useState(null);


  const [formData, setFormData] =
    useState({
      code: "",
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      maxDiscount: "",
      minOrderAmount: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
      userLimit: 1,
    });


  // =====================================================
  // GET COUPONS
  // =====================================================

  useEffect(() => {
    dispatch(getCouponsThunk());
  }, [dispatch]);


  // =====================================================
  // FILTER
  // =====================================================

  const filteredCoupons = coupons.filter(
    (coupon) => {

      const searchMatch =
        coupon.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        coupon.title
          .toLowerCase()
          .includes(search.toLowerCase());


      const now = new Date();

      let statusMatch = true;

      if (filter === "Active") {
        statusMatch =
          coupon.isActive &&
          new Date(coupon.endDate) >= now;
      }

      if (filter === "Inactive") {
        statusMatch =
          !coupon.isActive ||
          new Date(coupon.endDate) < now;
      }

      return searchMatch && statusMatch;
    }
  );


  // =====================================================
  // OPEN ADD
  // =====================================================

  const openAddModal = () => {

    setEditingCoupon(null);

    setFormData({
      code: "",
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      maxDiscount: "",
      minOrderAmount: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
      userLimit: 1,
    });

    setShowModal(true);
  };


  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEditModal = (coupon) => {

    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      title: coupon.title,
      description: coupon.description || "",
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxDiscount:
        coupon.maxDiscount || "",
      minOrderAmount:
        coupon.minOrderAmount || "",
      startDate:
        coupon.startDate?.slice(0, 10),
      endDate:
        coupon.endDate?.slice(0, 10),
      usageLimit:
        coupon.usageLimit || "",
      userLimit:
        coupon.userLimit || 1,
    });

    setOpenMenu(null);

    setShowModal(true);
  };


  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      ...formData,

      discountValue:
        Number(formData.discountValue),

      maxDiscount:
        formData.maxDiscount
          ? Number(formData.maxDiscount)
          : null,

      minOrderAmount:
        Number(formData.minOrderAmount || 0),

      usageLimit:
        formData.usageLimit
          ? Number(formData.usageLimit)
          : null,

      userLimit:
        Number(formData.userLimit || 1),
    };


    if (editingCoupon) {

      dispatch(
        updateCouponThunk({
          id: editingCoupon._id,
          data,
        })
      );

    } else {

      dispatch(
        createCouponThunk(data)
      );
    }

    setShowModal(false);
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this coupon?"
      );

    if (!confirmDelete) return;

    dispatch(deleteCouponThunk(id));

    setOpenMenu(null);
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  return (
    <div className="space-y-5">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center mt-2 md:mt-0 justify-between gap-4">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-[#293b25]/10
              text-[#293b25]
              flex items-center justify-center
            "
          >
            <FiTag size={18} />
          </div>


          <div>

            <h1 className="text-xl font-semibold text-[#293b25]">
              Coupons
            </h1>

            <p className="text-[10px] text-gray-400 mt-0.5">
              Create and manage discount coupons
            </p>

          </div>

        </div>


        <button
          onClick={openAddModal}
          className="
            flex items-center justify-center gap-2
            h-10 px-4
            rounded-xl
            bg-[#293b25]
            text-white
            text-[10px]
            font-medium
            hover:bg-[#1f2e1c]
          "
        >
          <FiPlus size={15} />
          Add Coupon
        </button>

      </div>


      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border border-gray-200
          rounded-xl
          p-3
          flex flex-col sm:flex-row
          gap-3
          sm:items-center
          sm:justify-between
        "
      >

        <div
          className="
            flex items-center gap-2
            h-9 px-3
            rounded-lg
            bg-[#f7f7f4]
            w-full sm:max-w-[350px]
          "
        >

          <FiSearch
            size={14}
            className="text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search coupon..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-[10px]
            "
          />

        </div>


        <div className="flex gap-1.5">

          {[
            "All",
            "Active",
            "Inactive",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`
                px-3 py-1.5
                rounded-lg
                text-[9px]
                font-medium

                ${
                  filter === item
                    ? "bg-[#293b25] text-white"
                    : "bg-gray-50 text-gray-500"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border border-gray-200
          rounded-2xl
          overflow-visible
        "
      >

        {/* HEADER */}

        <div
          className="
            hidden md:grid
            grid-cols-[1.3fr_1fr_130px_130px_100px_50px]
            items-center
            h-12
            px-5
            bg-[#fafaf8]
            border-b border-gray-100
          "
        >

          <p className="text-[9px] font-semibold text-gray-400 uppercase">
            Coupon
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase">
            Discount
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase">
            Validity
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase">
            Usage
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase">
            Status
          </p>

          <p></p>

        </div>


        {/* ROW */}

        {filteredCoupons.map(
          (coupon) => (

            <div
              key={coupon._id}
              className="
                relative
                grid
                grid-cols-[1fr_auto_auto]
                md:grid-cols-[1.3fr_1fr_130px_130px_100px_50px]
                items-center
                px-4 md:px-5
                py-3.5
                border-b border-gray-100
                last:border-b-0
                hover:bg-[#fafaf8]
              "
            >

              {/* COUPON */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-lg
                    bg-[#293b25]/10
                    text-[#293b25]
                    flex items-center justify-center
                  "
                >
                  <FiTag size={15} />
                </div>


                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <p className="text-[11px] font-semibold text-gray-700">
                      {coupon.code}
                    </p>

                    {coupon.discountType ===
                      "percentage" && (

                      <span className="text-[7px] px-1.5 py-0.5 rounded bg-[#293b25]/10 text-[#293b25]">
                        %
                      </span>

                    )}

                  </div>

                  <p className="text-[9px] text-gray-400 truncate max-w-[200px]">
                    {coupon.title}
                  </p>

                </div>

              </div>


              {/* DISCOUNT */}

              <div className="hidden md:block">

                <p className="text-xs font-semibold text-gray-700">

                  {coupon.discountType ===
                  "percentage"
                    ? `${coupon.discountValue}% OFF`
                    : `₹${coupon.discountValue} OFF`}

                </p>

                {coupon.minOrderAmount > 0 && (

                  <p className="text-[8px] text-gray-400 mt-1">
                    Min ₹{coupon.minOrderAmount}
                  </p>

                )}

              </div>


              {/* VALIDITY */}

              <div className="hidden md:block">

                <p className="text-[9px] text-gray-600">
                  {formatDate(coupon.startDate)}
                </p>

                <p className="text-[8px] text-gray-400">
                  to {formatDate(coupon.endDate)}
                </p>

              </div>


              {/* USAGE */}

              <div className="hidden md:block">

                <p className="text-[10px] text-gray-600">

                  {coupon.usedCount}

                  <span className="text-gray-400">
                    {" "}
                    /{" "}
                    {coupon.usageLimit || "∞"}
                  </span>

                </p>

              </div>


              {/* STATUS */}

              <div>

                <button
                  onClick={() =>
                    dispatch(
                      toggleCouponThunk(
                        coupon._id
                      )
                    )
                  }
                  className={`
                    relative
                    w-9 h-5
                    rounded-full

                    ${
                      coupon.isActive
                        ? "bg-[#293b25]"
                        : "bg-gray-200"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-[3px]
                      w-3.5 h-3.5
                      rounded-full
                      bg-white
                      shadow

                      ${
                        coupon.isActive
                          ? "left-[21px]"
                          : "left-[3px]"
                      }
                    `}
                  />

                </button>

              </div>


              {/* MENU */}

              <div className="relative flex justify-end">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === coupon._id
                        ? null
                        : coupon._id
                    )
                  }
                  className="
                    w-8 h-8
                    rounded-lg
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-gray-100
                  "
                >
                  <FiMoreVertical size={16} />
                </button>


                {openMenu === coupon._id && (

                  <>

                    <div
                      className="fixed inset-0 z-40"
                      onClick={() =>
                        setOpenMenu(null)
                      }
                    />


                    <div
                      className="
                        absolute
                        right-0 top-10
                        z-50
                        w-32
                        bg-white
                        border border-gray-200
                        rounded-xl
                        shadow-xl
                        p-1
                      "
                    >

                      <button
                        onClick={() =>
                          openEditModal(coupon)
                        }
                        className="
                          w-full
                          flex items-center gap-2
                          px-3 py-2
                          rounded-lg
                          text-[10px]
                          text-gray-600
                          hover:bg-gray-50
                        "
                      >
                        <FiEdit2 size={13} />
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(coupon._id)
                        }
                        className="
                          w-full
                          flex items-center gap-2
                          px-3 py-2
                          rounded-lg
                          text-[10px]
                          text-red-500
                          hover:bg-red-50
                        "
                      >
                        <FiTrash2 size={13} />
                        Delete
                      </button>

                    </div>

                  </>

                )}

              </div>

            </div>

          )
        )}

        {!loading &&
          filteredCoupons.length === 0 && (

            <div className="py-14 text-center">

              <FiTag
                size={25}
                className="mx-auto text-gray-300"
              />

              <p className="text-xs text-gray-400 mt-3">
                No coupons found
              </p>

            </div>

          )}

      </div>


      {/* ================================================= */}
      {/* MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div
          className="
            fixed inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-[520px]
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              shadow-2xl
            "
          >

            {/* HEADER */}

            <div
              className="
                sticky top-0
                z-10
                bg-white
                px-5 py-4
                border-b border-gray-100
                flex items-center justify-between
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-[#293b25]">
                  {editingCoupon
                    ? "Edit Coupon"
                    : "Create Coupon"}
                </h2>

                <p className="text-[9px] text-gray-400 mt-1">
                  Configure your discount coupon
                </p>

              </div>


              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  w-8 h-8
                  rounded-lg
                  flex items-center justify-center
                  hover:bg-gray-100
                "
              >
                <FiX size={16} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4"
            >

              {/* CODE */}

              <div>

                <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                  Coupon Code
                </label>

                <input
                  name="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="SWARNIKA20"
                  className="
                    w-full h-10
                    px-3
                    rounded-lg
                    border border-gray-200
                    outline-none
                    text-xs
                    uppercase
                    focus:border-[#293b25]
                  "
                  required
                />

              </div>


              {/* TITLE */}

              <div>

                <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                  Coupon Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="20% Off on your first order"
                  className="
                    w-full h-10
                    px-3
                    rounded-lg
                    border border-gray-200
                    outline-none
                    text-xs
                    focus:border-[#293b25]
                  "
                  required
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add coupon description..."
                  rows={2}
                  className="
                    w-full
                    px-3 py-2
                    rounded-lg
                    border border-gray-200
                    outline-none
                    text-xs
                    resize-none
                    focus:border-[#293b25]
                  "
                />

              </div>


              {/* DISCOUNT */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Discount Type
                  </label>

                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-xs
                      bg-white
                    "
                  >
                    <option value="percentage">
                      Percentage %
                    </option>

                    <option value="fixed">
                      Fixed ₹
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Discount Value
                  </label>

                  <input
                    type="number"
                    name="discountValue"
                    min="1"
                    value={formData.discountValue}
                    onChange={handleChange}
                    placeholder="20"
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-xs
                    "
                    required
                  />

                </div>

              </div>


              {/* MAX DISCOUNT */}

              {formData.discountType ===
                "percentage" && (

                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Maximum Discount
                  </label>

                  <input
                    type="number"
                    name="maxDiscount"
                    min="0"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    placeholder="500"
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-xs
                    "
                  />

                </div>

              )}


              {/* MIN ORDER */}

              <div>

                <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                  Minimum Order Amount
                </label>

                <input
                  type="number"
                  name="minOrderAmount"
                  min="0"
                  value={formData.minOrderAmount}
                  onChange={handleChange}
                  placeholder="999"
                  className="
                    w-full h-10
                    px-3
                    rounded-lg
                    border border-gray-200
                    outline-none
                    text-xs
                  "
                />

              </div>


              {/* DATES */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-[10px]
                    "
                    required
                  />

                </div>


                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-[10px]
                    "
                    required
                  />

                </div>

              </div>


              {/* LIMITS */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Total Usage Limit
                  </label>

                  <input
                    type="number"
                    name="usageLimit"
                    min="1"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    placeholder="100"
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-xs
                    "
                  />

                </div>


                <div>

                  <label className="block text-[10px] font-medium text-gray-600 mb-1.5">
                    Usage Per User
                  </label>

                  <input
                    type="number"
                    name="userLimit"
                    min="1"
                    value={formData.userLimit}
                    onChange={handleChange}
                    className="
                      w-full h-10
                      px-3
                      rounded-lg
                      border border-gray-200
                      outline-none
                      text-xs
                    "
                  />

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-[#293b25]
                  text-white
                  text-[10px]
                  font-medium
                  hover:bg-[#1f2e1c]
                  disabled:opacity-50
                  mt-2
                "
              >
                {loading
                  ? "Saving..."
                  : editingCoupon
                  ? "Update Coupon"
                  : "Create Coupon"}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Coupons;