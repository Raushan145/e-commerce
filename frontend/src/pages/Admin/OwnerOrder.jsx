import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPackage,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiBox,
  FiChevronRight,
  FiX,
  FiUser,
} from "react-icons/fi";

const OwnerOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // DUMMY ORDERS
  // =========================================================

  const orders = [
    {
      id: "#ORD-1024",
      customer: {
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "+91 9876543210",
      },

      date: "03 Sep 2026, 10:42 AM",

      status: "Delivered",

      payment: "Paid",
      paymentMethod: "UPI",

      subtotal: 2280,
      shipping: 50,
      discount: 150,
      total: 2180,

      address: {
        name: "Rahul Kumar",
        address: "Boring Road, Patna",
        city: "Patna",
        state: "Bihar",
        pincode: "800001",
      },

      products: [
        {
          name: "Premium Cotton Shirt",
          category: "Men's Wear",
          quantity: 1,
          price: 1299,
          image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
        },
        {
          name: "Casual Sneakers",
          category: "Footwear",
          quantity: 1,
          price: 999,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "03 Sep, 10:42 AM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "03 Sep, 10:48 AM",
          completed: true,
        },
        {
          title: "Packed",
          date: "03 Sep, 12:15 PM",
          completed: true,
        },
        {
          title: "Shipped",
          date: "03 Sep, 03:20 PM",
          completed: true,
        },
        {
          title: "Delivered",
          date: "04 Sep, 01:10 PM",
          completed: true,
        },
      ],
    },

    {
      id: "#ORD-1023",
      customer: {
        name: "Priya Singh",
        email: "priya@gmail.com",
        phone: "+91 9123456780",
      },

      date: "03 Sep 2026, 09:28 AM",

      status: "Processing",

      payment: "Paid",
      paymentMethod: "Card",

      subtotal: 3720,
      shipping: 0,
      discount: 200,
      total: 3520,

      address: {
        name: "Priya Singh",
        address: "MP Nagar Zone 2",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pincode: "462011",
      },

      products: [
        {
          name: "Designer Kurti",
          category: "Women's Wear",
          quantity: 2,
          price: 1499,
          image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
        },
        {
          name: "Classic Handbag",
          category: "Accessories",
          quantity: 1,
          price: 722,
          image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "03 Sep, 09:28 AM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "03 Sep, 09:35 AM",
          completed: true,
        },
        {
          title: "Packed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Shipped",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Delivered",
          date: "Waiting",
          completed: false,
        },
      ],
    },

    {
      id: "#ORD-1022",
      customer: {
        name: "Aman Kumar",
        email: "aman@gmail.com",
        phone: "+91 9988776655",
      },

      date: "02 Sep 2026, 06:15 PM",

      status: "Shipped",

      payment: "Paid",
      paymentMethod: "UPI",

      subtotal: 1249,
      shipping: 60,
      discount: 100,
      total: 1209,

      address: {
        name: "Aman Kumar",
        address: "Kolar Road",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pincode: "462042",
      },

      products: [
        {
          name: "Classic Sneakers",
          category: "Footwear",
          quantity: 1,
          price: 1249,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "02 Sep, 06:15 PM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "02 Sep, 06:25 PM",
          completed: true,
        },
        {
          title: "Packed",
          date: "02 Sep, 08:30 PM",
          completed: true,
        },
        {
          title: "Shipped",
          date: "03 Sep, 09:20 AM",
          completed: true,
        },
        {
          title: "Delivered",
          date: "Waiting",
          completed: false,
        },
      ],
    },

    {
      id: "#ORD-1021",
      customer: {
        name: "Neha Verma",
        email: "neha@gmail.com",
        phone: "+91 9001122334",
      },

      date: "02 Sep 2026, 04:32 PM",

      status: "Delivered",

      payment: "Paid",
      paymentMethod: "Cash on Delivery",

      subtotal: 4890,
      shipping: 0,
      discount: 300,
      total: 4590,

      address: {
        name: "Neha Verma",
        address: "Gomti Nagar",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226010",
      },

      products: [
        {
          name: "Designer Saree",
          category: "Women's Wear",
          quantity: 1,
          price: 2999,
          image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
        },
        {
          name: "Classic Handbag",
          category: "Accessories",
          quantity: 1,
          price: 1891,
          image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "02 Sep, 04:32 PM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "02 Sep, 04:40 PM",
          completed: true,
        },
        {
          title: "Packed",
          date: "02 Sep, 07:15 PM",
          completed: true,
        },
        {
          title: "Shipped",
          date: "03 Sep, 08:00 AM",
          completed: true,
        },
        {
          title: "Delivered",
          date: "03 Sep, 02:30 PM",
          completed: true,
        },
      ],
    },

    {
      id: "#ORD-1020",
      customer: {
        name: "Arjun Singh",
        email: "arjun@gmail.com",
        phone: "+91 9112233445",
      },

      date: "02 Sep 2026, 02:10 PM",

      status: "Pending",

      payment: "Pending",
      paymentMethod: "Cash on Delivery",

      subtotal: 1560,
      shipping: 50,
      discount: 100,
      total: 1510,

      address: {
        name: "Arjun Singh",
        address: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
      },

      products: [
        {
          name: "Premium Cotton Shirt",
          category: "Men's Wear",
          quantity: 2,
          price: 780,
          image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "02 Sep, 02:10 PM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Packed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Shipped",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Delivered",
          date: "Waiting",
          completed: false,
        },
      ],
    },

    {
      id: "#ORD-1020",
      customer: {
        name: "Arjun Singh",
        email: "arjun@gmail.com",
        phone: "+91 9112233445",
      },

      date: "02 Sep 2026, 02:10 PM",

      status: "Pending",

      payment: "Pending",
      paymentMethod: "Cash on Delivery",

      subtotal: 1560,
      shipping: 50,
      discount: 100,
      total: 1510,

      address: {
        name: "Arjun Singh",
        address: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
      },

      products: [
        {
          name: "Premium Cotton Shirt",
          category: "Men's Wear",
          quantity: 2,
          price: 780,
          image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "02 Sep, 02:10 PM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Packed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Shipped",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Delivered",
          date: "Waiting",
          completed: false,
        },
      ],
    },

    {
      id: "#ORD-1020",
      customer: {
        name: "Arjun Singh",
        email: "arjun@gmail.com",
        phone: "+91 9112233445",
      },

      date: "02 Sep 2026, 02:10 PM",

      status: "Pending",

      payment: "Pending",
      paymentMethod: "Cash on Delivery",

      subtotal: 1560,
      shipping: 50,
      discount: 100,
      total: 1510,

      address: {
        name: "Arjun Singh",
        address: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
      },

      products: [
        {
          name: "Premium Cotton Shirt",
          category: "Men's Wear",
          quantity: 2,
          price: 780,
          image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
        },
      ],

      timeline: [
        {
          title: "Order Placed",
          date: "02 Sep, 02:10 PM",
          completed: true,
        },
        {
          title: "Order Confirmed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Packed",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Shipped",
          date: "Waiting",
          completed: false,
        },
        {
          title: "Delivered",
          date: "Waiting",
          completed: false,
        },
      ],
    },
  ];

  // =========================================================
  // FILTER
  // =========================================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        order.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [search, statusFilter]);

  // =========================================================
  // STATUS STYLE
  // =========================================================

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

      case "Cancelled":
        return "bg-red-50 text-red-500";

      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="space-y-5">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div>
        <h1 className="text-2xl font-semibold text-[#293b25]">
          Orders
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Manage and track all orders from your store.
        </p>
      </div>


      {/* ================================================= */}
      {/* ORDER STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] text-gray-400">
            Total Orders
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-1">
            186
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] text-gray-400">
            Pending
          </p>

          <h2 className="text-xl font-semibold text-orange-500 mt-1">
            12
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] text-gray-400">
            Processing
          </p>

          <h2 className="text-xl font-semibold text-yellow-600 mt-1">
            08
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] text-gray-400">
            Delivered
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-1">
            166
          </h2>
        </div>

      </div>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-5">


        {/* ================================================= */}
        {/* LEFT - ORDER LIST */}
        {/* ================================================= */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            overflow-hidden
            h-fit
          "
        >

          {/* Search */}

          <div className="p-4 border-b border-gray-100">

            <div
              className="
                flex
                items-center
                gap-2
                px-3
                h-10
                rounded-xl
                bg-[#f7f7f4]
              "
            >

              <FiSearch
                size={15}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search order or customer..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-xs
                  text-gray-700
                  placeholder:text-gray-400
                "
              />

            </div>


            {/* Filters */}

            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">

              {[
                "All",
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
              ].map((status) => (

                <button
                  key={status}
                  onClick={() =>
                    setStatusFilter(status)
                  }
                  className={`
                    whitespace-nowrap
                    px-3
                    py-1.5
                    rounded-lg
                    text-[9px]
                    font-medium
                    transition

                    ${
                      statusFilter === status
                        ? "bg-[#293b25] text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }
                  `}
                >
                  {status}
                </button>

              ))}

            </div>

          </div>


          {/* Order Count */}

          <div className="px-4 py-3 bg-[#fafaf8]">

            <p className="text-[10px] text-gray-400">
              {filteredOrders.length} orders found
            </p>

          </div>


          {/* Orders */}

          <div className="max-h-[650px] overflow-y-auto">

            {filteredOrders.length === 0 ? (

              <div className="p-8 text-center">

                <FiPackage
                  size={28}
                  className="mx-auto text-gray-300"
                />

                <p className="text-xs text-gray-500 mt-3">
                  No orders found
                </p>

              </div>

            ) : (

              filteredOrders.map((order) => (

                <button
                  key={order.id}
                  onClick={() =>
                    setSelectedOrder(order)
                  }
                  className={`
                    w-full
                    text-left
                    p-4
                    border-b
                    border-gray-100
                    transition

                    ${
                      selectedOrder?.id === order.id
                        ? "bg-[#f5f5f1]"
                        : "hover:bg-[#fafaf8]"
                    }
                  `}
                >

                  <div className="flex justify-between gap-3">

                    <div>

                      <p className="text-xs font-semibold text-[#293b25]">
                        {order.id}
                      </p>

                      <p className="text-[11px] text-gray-700 mt-1">
                        {order.customer.name}
                      </p>

                    </div>

                    <span
                      className={`
                        h-fit
                        px-2
                        py-1
                        rounded-full
                        text-[8px]
                        font-medium
                        ${getStatusStyle(order.status)}
                      `}
                    >
                      {order.status}
                    </span>

                  </div>


                  <div className="flex items-center justify-between mt-3">

                    <span className="text-[9px] text-gray-400">
                      {order.products.length}{" "}
                      {order.products.length === 1
                        ? "Product"
                        : "Products"}
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      ₹{order.total.toLocaleString()}
                    </span>

                  </div>


                  <div className="flex items-center justify-between mt-2">

                    <span className="text-[9px] text-gray-400">
                      {order.date}
                    </span>

                    <FiChevronRight
                      size={14}
                      className="text-gray-300"
                    />

                  </div>

                </button>

              ))

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* RIGHT - ORDER DETAIL */}
        {/* ================================================= */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            overflow-hidden
            min-h-[600px]
          "
        >

          {!selectedOrder ? (

            /* EMPTY STATE */

            <div
              className="
                min-h-[600px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-6
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#f5f5f1]
                  flex
                  items-center
                  justify-center
                  text-[#293b25]
                "
              >
                <FiPackage size={27} />
              </div>

              <h3 className="text-sm font-semibold text-gray-700 mt-4">
                Select an order
              </h3>

              <p className="text-[10px] text-gray-400 mt-1 max-w-[250px]">
                Select an order from the list to view complete
                order details.
              </p>

            </div>

          ) : (

            <div>

              {/* ================================================= */}
              {/* DETAIL HEADER */}
              {/* ================================================= */}

              <div
                className="
                  p-5
                  border-b
                  border-gray-100
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  justify-between
                  gap-3
                "
              >

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-base font-semibold text-[#293b25]">
                      {selectedOrder.id}
                    </h2>

                    <span
                      className={`
                        px-2
                        py-1
                        rounded-full
                        text-[8px]
                        font-medium
                        ${getStatusStyle(
                          selectedOrder.status
                        )}
                      `}
                    >
                      {selectedOrder.status}
                    </span>

                  </div>

                  <p className="text-[10px] text-gray-400 mt-1">
                    Placed on {selectedOrder.date}
                  </p>

                </div>


                {/* Status */}

                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;

                    setSelectedOrder({
                      ...selectedOrder,
                      status: newStatus,
                    });
                  }}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-gray-200
                    text-[10px]
                    text-gray-600
                    outline-none
                    bg-white
                  "
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>


              {/* ================================================= */}
              {/* CONTENT */}
              {/* ================================================= */}

              <div className="p-5 space-y-5">


                {/* ================================================= */}
                {/* CUSTOMER + SHIPPING */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* CUSTOMER */}

                  <div
                    className="
                      border
                      border-gray-100
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex items-center gap-2 mb-4">

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
                        <FiUser size={15} />
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-gray-700">
                          Customer Details
                        </h3>

                        <p className="text-[9px] text-gray-400">
                          Order placed by
                        </p>
                      </div>

                    </div>


                    <p className="text-sm font-medium text-gray-800">
                      {selectedOrder.customer.name}
                    </p>


                    <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                      <FiMail size={12} />
                      {selectedOrder.customer.email}
                    </div>


                    <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                      <FiPhone size={12} />
                      {selectedOrder.customer.phone}
                    </div>

                  </div>


                  {/* SHIPPING */}

                  <div
                    className="
                      border
                      border-gray-100
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex items-center gap-2 mb-4">

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
                        <FiMapPin size={15} />
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-gray-700">
                          Shipping Address
                        </h3>

                        <p className="text-[9px] text-gray-400">
                          Delivery address
                        </p>
                      </div>

                    </div>


                    <p className="text-xs font-medium text-gray-700">
                      {selectedOrder.address.name}
                    </p>

                    <p className="text-[10px] text-gray-400 mt-1 leading-5">
                      {selectedOrder.address.address}
                      <br />
                      {selectedOrder.address.city},{" "}
                      {selectedOrder.address.state}
                      <br />
                      PIN - {selectedOrder.address.pincode}
                    </p>

                  </div>

                </div>


                {/* ================================================= */}
                {/* PRODUCTS */}
                {/* ================================================= */}

                <div
                  className="
                    border
                    border-gray-100
                    rounded-xl
                    overflow-hidden
                  "
                >

                  <div className="p-4 border-b border-gray-100">

                    <h3 className="text-xs font-semibold text-gray-700">
                      Ordered Products
                    </h3>

                  </div>


                  <div className="divide-y divide-gray-100">

                    {selectedOrder.products.map(
                      (product, index) => (

                        <div
                          key={index}
                          className="
                            p-4
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              w-14
                              h-14
                              rounded-xl
                              object-cover
                              bg-gray-100
                            "
                          />


                          <div className="flex-1 min-w-0">

                            <p className="text-xs font-medium text-gray-800 truncate">
                              {product.name}
                            </p>

                            <p className="text-[9px] text-gray-400 mt-1">
                              {product.category}
                            </p>

                            <p className="text-[9px] text-gray-400 mt-1">
                              Qty: {product.quantity}
                            </p>

                          </div>


                          <p className="text-xs font-semibold text-gray-800">
                            ₹{product.price.toLocaleString()}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>


                {/* ================================================= */}
                {/* PAYMENT + SUMMARY */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* PAYMENT */}

                  <div
                    className="
                      border
                      border-gray-100
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex items-center gap-2">

                      <FiCreditCard
                        size={16}
                        className="text-[#293b25]"
                      />

                      <h3 className="text-xs font-semibold text-gray-700">
                        Payment
                      </h3>

                    </div>


                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-[10px] text-gray-400">
                        Method
                      </span>

                      <span className="text-[10px] font-medium text-gray-700">
                        {selectedOrder.paymentMethod}
                      </span>

                    </div>


                    <div className="mt-3 flex items-center justify-between">

                      <span className="text-[10px] text-gray-400">
                        Status
                      </span>

                      <span
                        className={`
                          px-2
                          py-1
                          rounded-full
                          text-[8px]
                          font-medium
                          ${
                            selectedOrder.payment === "Paid"
                              ? "bg-green-50 text-green-600"
                              : "bg-orange-50 text-orange-500"
                          }
                        `}
                      >
                        {selectedOrder.payment}
                      </span>

                    </div>

                  </div>


                  {/* ORDER SUMMARY */}

                  <div
                    className="
                      border
                      border-gray-100
                      rounded-xl
                      p-4
                    "
                  >

                    <h3 className="text-xs font-semibold text-gray-700">
                      Order Summary
                    </h3>


                    <div className="space-y-2 mt-4">

                      <div className="flex justify-between">
                        <span className="text-[10px] text-gray-400">
                          Subtotal
                        </span>

                        <span className="text-[10px] text-gray-700">
                          ₹
                          {selectedOrder.subtotal.toLocaleString()}
                        </span>
                      </div>


                      <div className="flex justify-between">
                        <span className="text-[10px] text-gray-400">
                          Shipping
                        </span>

                        <span className="text-[10px] text-gray-700">
                          ₹
                          {selectedOrder.shipping.toLocaleString()}
                        </span>
                      </div>


                      <div className="flex justify-between">
                        <span className="text-[10px] text-gray-400">
                          Discount
                        </span>

                        <span className="text-[10px] text-green-600">
                          -₹
                          {selectedOrder.discount.toLocaleString()}
                        </span>
                      </div>


                      <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between">

                        <span className="text-xs font-semibold text-gray-700">
                          Total
                        </span>

                        <span className="text-sm font-semibold text-[#293b25]">
                          ₹
                          {selectedOrder.total.toLocaleString()}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* ORDER TIMELINE */}
                {/* ================================================= */}

                <div
                  className="
                    border
                    border-gray-100
                    rounded-xl
                    p-4
                  "
                >

                  <h3 className="text-xs font-semibold text-gray-700">
                    Order Timeline
                  </h3>


                  <div className="mt-5 overflow-x-auto">

                    <div className="min-w-[650px] flex">

                      {selectedOrder.timeline.map(
                        (item, index) => (

                          <div
                            key={item.title}
                            className="
                              flex-1
                              relative
                              text-center
                            "
                          >

                            {/* LINE */}

                            {index <
                              selectedOrder.timeline
                                .length -
                                1 && (
                              <div
                                className={`
                                  absolute
                                  top-[12px]
                                  left-1/2
                                  w-full
                                  h-[2px]

                                  ${
                                    selectedOrder.timeline[
                                      index + 1
                                    ].completed
                                      ? "bg-[#293b25]"
                                      : "bg-gray-200"
                                  }
                                `}
                              />
                            )}


                            {/* CIRCLE */}

                            <div
                              className={`
                                relative
                                z-10
                                mx-auto
                                w-6
                                h-6
                                rounded-full
                                flex
                                items-center
                                justify-center

                                ${
                                  item.completed
                                    ? "bg-[#293b25] text-white"
                                    : "bg-white border-2 border-gray-200 text-gray-300"
                                }
                              `}
                            >

                              {item.completed ? (
                                <FiCheckCircle size={12} />
                              ) : (
                                <FiClock size={11} />
                              )}

                            </div>


                            <p
                              className={`
                                text-[9px]
                                font-medium
                                mt-3
                                ${
                                  item.completed
                                    ? "text-gray-700"
                                    : "text-gray-400"
                                }
                              `}
                            >
                              {item.title}
                            </p>

                            <p className="text-[8px] text-gray-400 mt-1">
                              {item.date}
                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="flex flex-wrap justify-end gap-2">

                  <button
                    className="
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-gray-200
                      text-[10px]
                      font-medium
                      text-gray-600
                      hover:bg-gray-50
                    "
                  >
                    Print Order
                  </button>

                  <button
                    className="
                      px-4
                      py-2.5
                      rounded-xl
                      bg-[#293b25]
                      text-white
                      text-[10px]
                      font-medium
                      hover:bg-[#1e2d1b]
                    "
                  >
                    Update Order
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default OwnerOrder;