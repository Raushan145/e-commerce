import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiX,
  FiShoppingBag,
  FiDollarSign,
  FiCalendar,
  FiUserX,
  FiCheck,
} from "react-icons/fi";

const Customers = () => {
  // =========================================================
  // DUMMY CUSTOMERS
  // =========================================================

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      mobile: "+91 9876543210",
      orders: 12,
      spent: 18990,
      status: true,
      joined: "12 Aug 2026",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      mobile: "+91 9123456780",
      orders: 8,
      spent: 12450,
      status: true,
      joined: "08 Aug 2026",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      mobile: "+91 9988776655",
      orders: 17,
      spent: 28690,
      status: true,
      joined: "01 Aug 2026",
    },
    {
      id: 4,
      name: "Ananya Verma",
      email: "ananya@gmail.com",
      mobile: "+91 9876123456",
      orders: 5,
      spent: 7490,
      status: false,
      joined: "28 Jul 2026",
    },
    {
      id: 5,
      name: "Rohan Gupta",
      email: "rohan@gmail.com",
      mobile: "+91 9765432109",
      orders: 21,
      spent: 35780,
      status: true,
      joined: "22 Jul 2026",
    },
    {
      id: 6,
      name: "Sneha Patel",
      email: "sneha@gmail.com",
      mobile: "+91 9012345678",
      orders: 9,
      spent: 15320,
      status: true,
      joined: "18 Jul 2026",
    },
    {
      id: 7,
      name: "Vikash Yadav",
      email: "vikash@gmail.com",
      mobile: "+91 9345678123",
      orders: 3,
      spent: 3290,
      status: false,
      joined: "10 Jul 2026",
    },
  ]);

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [openMenu, setOpenMenu] = useState(null);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [deleteCustomer, setDeleteCustomer] =
    useState(null);

  // =========================================================
  // FILTER CUSTOMERS
  // =========================================================

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(searchText) ||
        customer.email.toLowerCase().includes(searchText) ||
        customer.mobile.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && customer.status) ||
        (filter === "Blocked" && !customer.status);

      return matchesSearch && matchesFilter;
    });
  }, [customers, search, filter]);

  // =========================================================
  // TOGGLE CUSTOMER STATUS
  // =========================================================

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: !customer.status,
            }
          : customer
      )
    );
  };

  // =========================================================
  // DELETE CUSTOMER
  // =========================================================

  const handleDelete = () => {
    if (!deleteCustomer) return;

    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.id !== deleteCustomer.id
      )
    );

    setDeleteCustomer(null);
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => !customer.status
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) =>
      total + customer.spent,
    0
  );

  // =========================================================
  // FORMAT PRICE
  // =========================================================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // =========================================================
  // AVATAR
  // =========================================================

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="space-y-5">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-[#293b25]/10
              text-[#293b25]
              flex
              items-center
              justify-center
            "
          >
            <FiUser size={18} />
          </div>

          <div>

            <h1 className="text-xl font-semibold text-[#293b25]">
              Customers
            </h1>

            <p className="text-[10px] text-gray-400 mt-0.5">
              Manage your store customers
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        {/* TOTAL */}

        <div className="bg-white border border-gray-200 rounded-xl p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] text-gray-400">
                Total Customers
              </p>

              <p className="text-lg font-semibold text-gray-800 mt-1">
                {totalCustomers}
              </p>

            </div>

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-[#293b25]/10
                text-[#293b25]
                flex
                items-center
                justify-center
              "
            >
              <FiUser size={14} />
            </div>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="bg-white border border-gray-200 rounded-xl p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] text-gray-400">
                Active
              </p>

              <p className="text-lg font-semibold text-green-600 mt-1">
                {activeCustomers}
              </p>

            </div>

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-green-50
                text-green-600
                flex
                items-center
                justify-center
              "
            >
              <FiCheck size={14} />
            </div>

          </div>

        </div>


        {/* BLOCKED */}

        <div className="bg-white border border-gray-200 rounded-xl p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] text-gray-400">
                Blocked
              </p>

              <p className="text-lg font-semibold text-red-500 mt-1">
                {blockedCustomers}
              </p>

            </div>

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-red-50
                text-red-500
                flex
                items-center
                justify-center
              "
            >
              <FiUserX size={14} />
            </div>

          </div>

        </div>


        {/* REVENUE */}

        <div className="bg-white border border-gray-200 rounded-xl p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[9px] text-gray-400">
                Customer Revenue
              </p>

              <p className="text-lg font-semibold text-gray-800 mt-1">
                {formatPrice(totalRevenue)}
              </p>

            </div>

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-[#293b25]/10
                text-[#293b25]
                flex
                items-center
                justify-center
              "
            >
              <FiDollarSign size={14} />
            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-xl
          p-3
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:items-center
          sm:justify-between
        "
      >

        {/* SEARCH */}

        <div
          className="
            flex
            items-center
            gap-2
            h-9
            px-3
            rounded-lg
            bg-[#f7f7f4]
            w-full
            sm:max-w-[350px]
          "
        >

          <FiSearch
            size={14}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search name, email or mobile..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              flex-1
              bg-transparent
              outline-none
              text-[10px]
              text-gray-700
              placeholder:text-gray-400
            "
          />

        </div>


        {/* FILTER */}

        <div className="flex gap-1.5">

          {["All", "Active", "Blocked"].map(
            (item) => (

              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`
                  px-3
                  py-1.5
                  rounded-lg
                  text-[9px]
                  font-medium
                  transition

                  ${
                    filter === item
                      ? "bg-[#293b25] text-white"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                {item}
              </button>

            )
          )}

        </div>

      </div>


      {/* ================================================= */}
      {/* CUSTOMER TABLE */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          overflow-visible
        "
      >

        {/* DESKTOP HEADER */}

        <div
          className="
            hidden
            md:grid
            grid-cols-[minmax(230px,1.4fr)_minmax(180px,1fr)_120px_100px_120px_50px]
            items-center
            px-5
            h-12
            bg-[#fafaf8]
            border-b
            border-gray-100
          "
        >

          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
            Customer
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
            Contact
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
            Orders
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
            Spent
          </p>

          <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
            Status
          </p>

          <p></p>

        </div>


        {/* ================================================= */}
        {/* CUSTOMER ROWS */}
        {/* ================================================= */}

        {filteredCustomers.length === 0 ? (

          <div className="py-16 text-center">

            <FiUser
              size={26}
              className="mx-auto text-gray-300"
            />

            <p className="text-xs text-gray-500 mt-3">
              No customers found
            </p>

          </div>

        ) : (

          filteredCustomers.map((customer) => (

            <div
              key={customer.id}
              className="
                relative
                grid
                grid-cols-[1fr_auto_auto]
                md:grid-cols-[minmax(230px,1.4fr)_minmax(180px,1fr)_120px_100px_120px_50px]
                items-center
                gap-3
                md:gap-0
                px-4
                md:px-5
                py-3.5
                border-b
                border-gray-100
                last:border-b-0
                hover:bg-[#fafaf8]
                transition
              "
            >

              {/* ========================================= */}
              {/* CUSTOMER */}
              {/* ========================================= */}

              <div className="min-w-0">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      md:w-10
                      md:h-10
                      shrink-0
                      rounded-full
                      bg-[#293b25]
                      text-white
                      flex
                      items-center
                      justify-center
                      text-[10px]
                      font-medium
                    "
                  >
                    {getInitials(customer.name)}
                  </div>


                  <div className="min-w-0">

                    <p className="text-[11px] md:text-xs font-semibold text-gray-700 truncate">
                      {customer.name}
                    </p>

                    <p className="text-[8px] md:text-[9px] text-gray-400 mt-0.5 truncate">
                      Joined {customer.joined}
                    </p>

                  </div>

                </div>

              </div>


              {/* ========================================= */}
              {/* CONTACT */}
              {/* ========================================= */}

              <div className="hidden md:block">

                <p className="flex items-center gap-1.5 text-[9px] text-gray-600 truncate">

                  <FiMail
                    size={11}
                    className="text-gray-400 shrink-0"
                  />

                  {customer.email}

                </p>

                <p className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-1">

                  <FiPhone
                    size={10}
                    className="shrink-0"
                  />

                  {customer.mobile}

                </p>

              </div>


              {/* ========================================= */}
              {/* ORDERS */}
              {/* ========================================= */}

              <div className="flex items-center gap-1.5">

                <FiShoppingBag
                  size={12}
                  className="text-gray-400 hidden sm:block"
                />

                <span className="text-[10px] md:text-xs text-gray-600">
                  {customer.orders}
                </span>

                <span className="hidden md:inline text-[9px] text-gray-400">
                  orders
                </span>

              </div>


              {/* ========================================= */}
              {/* SPENT */}
              {/* ========================================= */}

              <p className="hidden md:block text-[10px] font-medium text-gray-700">
                {formatPrice(customer.spent)}
              </p>


              {/* ========================================= */}
              {/* STATUS */}
              {/* ========================================= */}

              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    toggleStatus(customer.id)
                  }
                  className={`
                    relative
                    w-9
                    h-5
                    rounded-full
                    shrink-0
                    transition-colors

                    ${
                      customer.status
                        ? "bg-[#293b25]"
                        : "bg-gray-200"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-[3px]
                      w-3.5
                      h-3.5
                      rounded-full
                      bg-white
                      shadow
                      transition-all

                      ${
                        customer.status
                          ? "left-[21px]"
                          : "left-[3px]"
                      }
                    `}
                  />

                </button>


                <span
                  className={`
                    hidden
                    lg:block
                    text-[9px]

                    ${
                      customer.status
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                >
                  {customer.status
                    ? "Active"
                    : "Blocked"}
                </span>

              </div>


              {/* ========================================= */}
              {/* THREE DOT */}
              {/* ========================================= */}

              <div className="relative flex justify-end">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === customer.id
                        ? null
                        : customer.id
                    )
                  }
                  className="
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  <FiMoreVertical size={16} />
                </button>


                {/* ===================================== */}
                {/* MENU */}
                {/* ===================================== */}

                {openMenu === customer.id && (

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
                        right-0
                        top-10
                        z-50
                        w-36
                        bg-white
                        border
                        border-gray-200
                        rounded-xl
                        shadow-xl
                        p-1
                      "
                    >

                      {/* VIEW */}

                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setOpenMenu(null);
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-lg
                          text-[10px]
                          text-gray-600
                          hover:bg-gray-50
                        "
                      >
                        <FiEye size={13} />
                        View Customer
                      </button>


                      {/* EDIT */}

                      <button
                        onClick={() => {
                          setOpenMenu(null);
                          alert(
                            "Edit customer feature"
                          );
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-lg
                          text-[10px]
                          text-gray-600
                          hover:bg-gray-50
                        "
                      >
                        <FiEdit2 size={13} />
                        Edit
                      </button>


                      {/* BLOCK */}

                      <button
                        onClick={() => {
                          toggleStatus(customer.id);
                          setOpenMenu(null);
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-lg
                          text-[10px]
                          text-orange-500
                          hover:bg-orange-50
                        "
                      >
                        <FiUserX size={13} />

                        {customer.status
                          ? "Block"
                          : "Unblock"}

                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() => {
                          setDeleteCustomer(customer);
                          setOpenMenu(null);
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-2
                          px-3
                          py-2
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

          ))

        )}

      </div>


      {/* ================================================= */}
      {/* VIEW CUSTOMER MODAL */}
      {/* ================================================= */}

      {selectedCustomer && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-[420px]
              rounded-2xl
              shadow-2xl
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div
              className="
                px-5
                py-4
                border-b
                border-gray-100
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-[#293b25]">
                  Customer Details
                </h2>

                <p className="text-[9px] text-gray-400 mt-1">
                  Customer profile information
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:bg-gray-100
                "
              >
                <FiX size={16} />
              </button>

            </div>


            {/* CUSTOMER PROFILE */}

            <div className="p-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#293b25]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-medium
                  "
                >
                  {getInitials(
                    selectedCustomer.name
                  )}
                </div>


                <div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    {selectedCustomer.name}
                  </h3>

                  <span
                    className={`
                      inline-flex
                      mt-1
                      px-2
                      py-1
                      rounded-md
                      text-[8px]
                      ${
                        selectedCustomer.status
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-500"
                      }
                    `}
                  >
                    {selectedCustomer.status
                      ? "Active Customer"
                      : "Blocked Customer"}
                  </span>

                </div>

              </div>


              {/* INFO */}

              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-3">

                  <FiMail
                    size={14}
                    className="text-gray-400"
                  />

                  <div>

                    <p className="text-[8px] text-gray-400">
                      Email
                    </p>

                    <p className="text-[10px] text-gray-700 mt-0.5">
                      {selectedCustomer.email}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3">

                  <FiPhone
                    size={14}
                    className="text-gray-400"
                  />

                  <div>

                    <p className="text-[8px] text-gray-400">
                      Mobile
                    </p>

                    <p className="text-[10px] text-gray-700 mt-0.5">
                      {selectedCustomer.mobile}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3">

                  <FiCalendar
                    size={14}
                    className="text-gray-400"
                  />

                  <div>

                    <p className="text-[8px] text-gray-400">
                      Joined
                    </p>

                    <p className="text-[10px] text-gray-700 mt-0.5">
                      {selectedCustomer.joined}
                    </p>

                  </div>

                </div>

              </div>


              {/* CUSTOMER STATS */}

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div
                  className="
                    rounded-xl
                    bg-[#f7f7f4]
                    p-3
                  "
                >

                  <p className="text-[8px] text-gray-400">
                    Total Orders
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {selectedCustomer.orders}
                  </p>

                </div>


                <div
                  className="
                    rounded-xl
                    bg-[#f7f7f4]
                    p-3
                  "
                >

                  <p className="text-[8px] text-gray-400">
                    Total Spent
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {formatPrice(
                      selectedCustomer.spent
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteCustomer && (

        <div
          className="
            fixed
            inset-0
            z-[110]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-[360px]
              bg-white
              rounded-2xl
              p-6
              shadow-2xl
              text-center
            "
          >

            <div
              className="
                w-11
                h-11
                mx-auto
                rounded-xl
                bg-red-50
                text-red-500
                flex
                items-center
                justify-center
              "
            >
              <FiTrash2 size={18} />
            </div>


            <h3 className="text-sm font-semibold text-gray-800 mt-4">
              Delete Customer?
            </h3>


            <p className="text-[10px] text-gray-400 mt-2 leading-5">

              Are you sure you want to delete{" "}

              <span className="font-medium text-gray-600">
                "{deleteCustomer.name}"
              </span>

              ?

            </p>


            <div className="flex gap-2 mt-5">

              <button
                onClick={() =>
                  setDeleteCustomer(null)
                }
                className="
                  flex-1
                  h-10
                  rounded-lg
                  border
                  border-gray-200
                  text-[10px]
                  text-gray-600
                "
              >
                Cancel
              </button>


              <button
                onClick={handleDelete}
                className="
                  flex-1
                  h-10
                  rounded-lg
                  bg-red-500
                  text-white
                  text-[10px]
                  font-medium
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Customers;