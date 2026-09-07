import React from "react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiPackage,
  FiAlertTriangle,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiPlus,
  FiEye,
  FiBox,
  FiTruck,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // ================= DUMMY DATA =================

  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,24,850",
      change: "+12.5%",
      text: "vs last month",
      icon: FiDollarSign,
      positive: true,
    },
    {
      title: "Total Orders",
      value: "186",
      change: "+8.2%",
      text: "vs last month",
      icon: FiShoppingBag,
      positive: true,
    },
    {
      title: "Total Products",
      value: "48",
      change: "+4",
      text: "new this month",
      icon: FiPackage,
      positive: true,
    },
    {
      title: "Low Stock",
      value: "05",
      change: "Attention",
      text: "products need restock",
      icon: FiAlertTriangle,
      positive: false,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1024",
      customer: "Rahul Kumar",
      products: "2 Items",
      amount: "₹2,480",
      status: "Delivered",
      date: "Today, 10:42 AM",
    },
    {
      id: "#ORD-1023",
      customer: "Priya Singh",
      products: "3 Items",
      amount: "₹3,720",
      status: "Processing",
      date: "Today, 09:28 AM",
    },
    {
      id: "#ORD-1022",
      customer: "Aman Kumar",
      products: "1 Item",
      amount: "₹1,249",
      status: "Shipped",
      date: "Yesterday, 06:15 PM",
    },
    {
      id: "#ORD-1021",
      customer: "Neha Verma",
      products: "4 Items",
      amount: "₹4,890",
      status: "Delivered",
      date: "Yesterday, 04:32 PM",
    },
    {
      id: "#ORD-1020",
      customer: "Arjun Singh",
      products: "2 Items",
      amount: "₹1,560",
      status: "Pending",
      date: "Yesterday, 02:10 PM",
    },
  ];

  const topProducts = [
    {
      name: "Premium Cotton Shirt",
      category: "Men's Wear",
      sold: 84,
      revenue: "₹41,916",
    },
    {
      name: "Classic Handbag",
      category: "Accessories",
      sold: 72,
      revenue: "₹35,928",
    },
    {
      name: "Designer Kurti",
      category: "Women's Wear",
      sold: 65,
      revenue: "₹32,435",
    },
    {
      name: "Casual Sneakers",
      category: "Footwear",
      sold: 58,
      revenue: "₹28,420",
    },
  ];

  // ================= STATUS =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600";

      case "Processing":
        return "bg-yellow-50 text-yellow-600";

      case "Shipped":
        return "bg-blue-50 text-blue-600";

      case "Pending":
        return "bg-orange-50 text-orange-600";

      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FiCheckCircle size={11} />;

      case "Shipped":
        return <FiTruck size={11} />;

      case "Processing":
        return <FiBox size={11} />;

      case "Pending":
        return <FiClock size={11} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <p className="text-[11px] text-gray-400 mb-1">
           
          </p>

          <h1 className="text-md sm:text-xl font-semibold text-[#293b25]">
           Welcome back , {userData?.name || "Owner"}
          </h1>

          <p className="text-xs sm:text-xs text-gray-500 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex items-center gap-2">

          {/* <button
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-white
              border
              border-gray-200
              text-xs
              font-medium
              text-gray-600
              hover:bg-gray-50
              transition
            "
          >
            <FiEye size={15} />
            View Shop
          </button> */}

          <button
            onClick={() => {
              navigate("/owner/products")
              handleAdd()
            }}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-[#293b25]
              text-white
              text-xs
              font-medium
              hover:bg-[#1e2d1b]
              transition
              shadow-sm
            "
          >
            <FiPlus size={15} />
            Add Product
          </button>

        </div>

      </div>


      {/* ===================================================== */}
      {/* SHOP STATUS */}
      {/* ===================================================== */}

      {/* <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-4
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-green-50
              flex
              items-center
              justify-center
              text-green-600
            "
          >
            <FiCheckCircle size={19} />
          </div>

          <div>

            <p className="text-sm font-semibold text-gray-800">
              Your shop is open
            </p>

            <p className="text-[10px] text-gray-400 mt-0.5">
              Customers can browse and place orders
            </p>

          </div>

        </div>

        <button
          className="
            px-4
            py-2
            rounded-lg
            bg-green-50
            text-green-600
            text-[10px]
            font-semibold
            tracking-wide
            hover:bg-green-100
            transition
          "
        >
          OPEN
        </button>

      </div> */}


      {/* ===================================================== */}
      {/* STAT CARDS */}
      {/* ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                transition
              "
            >

              <div className="flex items-start justify-between">

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
                  <Icon size={19} />
                </div>

                <button className="text-gray-300 hover:text-gray-600">
                  <FiMoreHorizontal size={18} />
                </button>

              </div>

              <p className="text-[11px] text-gray-400 mt-4">
                {stat.title}
              </p>

              <div className="flex items-center justify-between mt-1">

                <h2 className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </h2>

                <span
                  className={`
                    flex
                    items-center
                    gap-0.5
                    text-[10px]
                    font-medium
                    ${
                      stat.positive
                        ? "text-green-600"
                        : "text-orange-500"
                    }
                  `}
                >
                  {stat.positive ? (
                    <FiArrowUpRight size={12} />
                  ) : (
                    <FiAlertTriangle size={11} />
                  )}

                  {stat.change}
                </span>

              </div>

              <p className="text-[9px] text-gray-400 mt-1">
                {stat.text}
              </p>

            </div>
          );
        })}

      </div>


      {/* ===================================================== */}
      {/* REVENUE + TOP PRODUCTS */}
      {/* ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.55fr_1fr]
          gap-5
        "
      >

        {/* ================= REVENUE ================= */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Revenue Overview
              </h2>

              <p className="text-[10px] text-gray-400 mt-1">
                Your store revenue for this week
              </p>
            </div>

            <select
              className="
                text-[10px]
                border
                border-gray-200
                rounded-lg
                px-3
                py-2
                text-gray-500
                outline-none
                bg-white
              "
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>

          </div>


          {/* Revenue */}

          <div className="mt-5">

            <div className="flex items-end gap-2">

              <h3 className="text-2xl font-semibold text-[#293b25]">
                ₹42,680
              </h3>

              <span className="text-[10px] text-green-600 flex items-center mb-1">
                <FiArrowUpRight size={12} />
                12.5%
              </span>

            </div>

            <p className="text-[9px] text-gray-400">
              Total revenue this week
            </p>

          </div>


          {/* ================= CHART ================= */}

          <div className="mt-7">

            <div
              className="
                h-[210px]
                flex
                items-end
                gap-2
                sm:gap-4
                border-b
                border-gray-100
                px-2
              "
            >

              {[
                { day: "Mon", value: 48, amount: "₹5.2K" },
                { day: "Tue", value: 67, amount: "₹7.1K" },
                { day: "Wed", value: 42, amount: "₹4.6K" },
                { day: "Thu", value: 78, amount: "₹8.4K" },
                { day: "Fri", value: 61, amount: "₹6.8K" },
                { day: "Sat", value: 91, amount: "₹9.7K" },
                { day: "Sun", value: 72, amount: "₹7.8K" },
              ].map((item) => (

                <div
                  key={item.day}
                  className="
                    flex-1
                    h-full
                    flex
                    flex-col
                    justify-end
                    items-center
                    gap-2
                    group
                  "
                >

                  <div
                    className="
                      relative
                      w-full
                      max-w-[42px]
                      rounded-t-lg
                      bg-[#293b25]
                      group-hover:bg-[#1d2d19]
                      transition-all
                    "
                    style={{
                      height: `${item.value}%`,
                    }}
                  >

                    <span
                      className="
                        absolute
                        -top-7
                        left-1/2
                        -translate-x-1/2

                        opacity-0
                        group-hover:opacity-100

                        whitespace-nowrap

                        bg-gray-800
                        text-white

                        text-[8px]

                        px-2
                        py-1

                        rounded-md

                        transition
                      "
                    >
                      {item.amount}
                    </span>

                  </div>

                  <span className="text-[9px] text-gray-400">
                    {item.day}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ================= TOP PRODUCTS ================= */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Top Selling Products
              </h2>

              <p className="text-[10px] text-gray-400 mt-1">
                Your best performing products
              </p>
            </div>

            <button
              onClick={() => navigate("/owner/products")}
              className="
                text-[10px]
                text-[#293b25]
                font-medium
                hover:underline
              "
            >
              View All
            </button>

          </div>


          <div className="mt-5 space-y-4">

            {topProducts.map((product, index) => (

              <div
                key={product.name}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {/* Number */}

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#f5f5f2]
                    text-[#293b25]
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-semibold
                    flex-shrink-0
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* Product */}

                <div className="flex-1 min-w-0">

                  <p className="text-xs font-medium text-gray-800 truncate">
                    {product.name}
                  </p>

                  <p className="text-[9px] text-gray-400 mt-0.5">
                    {product.category} · {product.sold} sold
                  </p>

                </div>


                {/* Revenue */}

                <p className="text-xs font-semibold text-gray-700">
                  {product.revenue}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ===================================================== */}
      {/* RECENT ORDERS */}
      {/* ===================================================== */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            p-5
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-2
            border-b
            border-gray-100
          "
        >

          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Orders
            </h2>

            <p className="text-[10px] text-gray-400 mt-1">
              Latest orders placed in your store
            </p>
          </div>

          <button
            onClick={() => navigate("/owner/orders")}
            className="
              self-start
              sm:self-auto
              text-[10px]
              text-[#293b25]
              font-medium
              hover:underline
            "
          >
            View All Orders →
          </button>

        </div>


        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-[#fafaf8]">

                <th className="px-5 py-3 text-left text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Order ID
                </th>

                <th className="px-5 py-3 text-left text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Products
                </th>

                <th className="px-5 py-3 text-left text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order.id}
                  className="
                    border-t
                    border-gray-100
                    hover:bg-[#fafaf8]
                    transition
                  "
                >

                  <td className="px-5 py-4">

                    <span className="text-xs font-semibold text-[#293b25]">
                      {order.id}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-xs text-gray-700">
                      {order.customer}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-xs text-gray-500">
                      {order.products}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-xs font-semibold text-gray-800">
                      {order.amount}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1
                        px-2.5
                        py-1.5
                        rounded-full
                        text-[9px]
                        font-medium
                        ${getStatusStyle(order.status)}
                      `}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>

                  </td>


                  <td className="px-5 py-4 text-right">

                    <span className="text-[10px] text-gray-400">
                      {order.date}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden divide-y divide-gray-100">

          {recentOrders.map((order) => (

            <div
              key={order.id}
              className="p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-xs font-semibold text-[#293b25]">
                    {order.id}
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1">
                    {order.customer}
                  </p>

                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    px-2
                    py-1
                    rounded-full
                    text-[8px]
                    font-medium
                    ${getStatusStyle(order.status)}
                  `}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>

              </div>


              <div className="flex items-center justify-between mt-3">

                <span className="text-[9px] text-gray-400">
                  {order.products}
                </span>

                <span className="text-xs font-semibold text-gray-800">
                  {order.amount}
                </span>

                <span className="text-[9px] text-gray-400">
                  {order.date}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ===================================================== */}
      {/* QUICK ACTIONS */}
      {/* ===================================================== */}

      <div>

        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          <button
            onClick={() => navigate("/owner/add-item")}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              text-left
              hover:border-[#293b25]/30
              hover:shadow-sm
              transition
            "
          >
            <FiPlus
              className="text-[#293b25]"
              size={19}
            />

            <p className="text-xs font-medium text-gray-700 mt-3">
              Add Product
            </p>

            <p className="text-[9px] text-gray-400 mt-1">
              Add new product
            </p>
          </button>


          <button
            onClick={() => navigate("/owner/products")}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              text-left
              hover:border-[#293b25]/30
              hover:shadow-sm
              transition
            "
          >
            <FiPackage
              className="text-[#293b25]"
              size={19}
            />

            <p className="text-xs font-medium text-gray-700 mt-3">
              Manage Products
            </p>

            <p className="text-[9px] text-gray-400 mt-1">
              View your products
            </p>
          </button>


          <button
            onClick={() => navigate("/owner/orders")}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              text-left
              hover:border-[#293b25]/30
              hover:shadow-sm
              transition
            "
          >
            <FiShoppingBag
              className="text-[#293b25]"
              size={19}
            />

            <p className="text-xs font-medium text-gray-700 mt-3">
              Manage Orders
            </p>

            <p className="text-[9px] text-gray-400 mt-1">
              Process customer orders
            </p>
          </button>


          <button
            onClick={() => navigate("/owner/shop")}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-4
              text-left
              hover:border-[#293b25]/30
              hover:shadow-sm
              transition
            "
          >
            <FiEye
              className="text-[#293b25]"
              size={19}
            />

            <p className="text-xs font-medium text-gray-700 mt-3">
              Shop Settings
            </p>

            <p className="text-[9px] text-gray-400 mt-1">
              Manage your shop
            </p>
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;