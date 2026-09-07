import React, { useEffect, useState } from "react";

import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUpload,
  FiImage,
  FiPackage,
  FiLayers,
  FiCheck,
  FiStar,
  FiMoreVertical,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import {
  createProductThunk,
  getProductsThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../redux/Product/productThunk";

const Products = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product);
  console.log(products)

  const { categories = [] } = useSelector(
    (state) => state.category
  );

  const { collections = [] } = useSelector(
    (state) => state.collection
  );

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteProduct, setDeleteProduct] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [toggleLoading, setToggleLoading] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",

    price: "",
    basePrice: "",

    category: "",
    collections: [],

    brand: "",

    images: [],
    imagePreviews: [],

    stock: "",

    isAvailable: true,
    isActive: true,

    isNewArrival: false,
    isBestSeller: false,

    color: "",
    size: [],
  });

  const [sizeInput, setSizeInput] = useState("");

  // =====================================================
  // GET PRODUCTS
  // =====================================================

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const fetchProducts = () => {
    dispatch(getProductsThunk());
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",

      price: "",
      basePrice: "",

      category: "",
      collections: [],

      brand: "",

      images: [],
      imagePreviews: [],

      stock: "",

      isAvailable: true,
      isActive: true,

      isNewArrival: false,
      isBestSeller: false,

      color: "",
      size: [],
    });

    setSizeInput("");
  };

  // =====================================================
  // ADD
  // =====================================================

  const handleAdd = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (product) => {
    setOpenMenu(null);

    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      description: product.description || "",

      price: product.price ?? "",
      basePrice: product.basePrice ?? "",

      category:
        product.category?._id ||
        product.category ||
        "",

      collections:
        product.collections?.map((item) =>
          item?._id ? item._id : item
        ) || [],

      brand: product.brand || "",

      images: [],
      imagePreviews: product.images || [],

      stock: product.stock ?? "",

      isAvailable: product.isAvailable ?? true,
      isActive: product.isActive ?? true,

      isNewArrival: product.isNewArrival ?? false,
      isBestSeller: product.isBestSeller ?? false,

      color: product.color || "",

      size: product.size || [],
    });

    setShowModal(true);
  };

  // =====================================================
  // TOGGLE ACTIVE / INACTIVE
  // =====================================================

  const handleToggleActive = async (product) => {
    if (!product?._id) return;

    const newStatus = !product.isActive;

    try {
      setToggleLoading(product._id);
      setOpenMenu(null);

      const data = new FormData();

      data.append("isActive", String(newStatus));

      await dispatch(
        updateProductThunk({
          id: product._id,
          formData: data,
        })
      ).unwrap();

      // Get latest DB data
      await dispatch(getProductsThunk()).unwrap();
    } catch (error) {
      console.error("Toggle Product Error:", error);
    } finally {
      setToggleLoading(null);
    }
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    setFormData((prev) => ({
      ...prev,

      images: [
        ...prev.images,
        ...validFiles,
      ],

      imagePreviews: [
        ...prev.imagePreviews,

        ...validFiles.map((file) =>
          URL.createObjectURL(file)
        ),
      ],
    }));

    // Same file dobara select karne ke liye
    e.target.value = "";
  };

  // =====================================================
  // STATS
  // =====================================================

  const NoOfProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive === true
  ).length;

  const inActiveProducts = products.filter(
    (product) => product.isActive === false
  ).length;

  const featuredProducts = products.filter(
    (product) =>
      product.isNewArrival === true ||
      product.isBestSeller === true
  ).length;

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,

      images: prev.images.filter(
        (_, i) => i !== index
      ),

      imagePreviews: prev.imagePreviews.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =====================================================
  // SIZE
  // =====================================================

  const addSize = () => {
    const value = sizeInput.trim();

    if (!value) return;

    if (formData.size.includes(value)) {
      setSizeInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      size: [...prev.size, value],
    }));

    setSizeInput("");
  };

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,

      size: prev.size.filter(
        (item) => item !== size
      ),
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select category");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append(
      "description",
      formData.description
    );

    data.append("price", formData.price);
    data.append(
      "basePrice",
      formData.basePrice || ""
    );

    data.append(
      "category",
      formData.category
    );

    data.append("brand", formData.brand);

    data.append("stock", formData.stock);

    data.append(
      "isAvailable",
      String(formData.isAvailable)
    );

    data.append(
      "isActive",
      String(formData.isActive)
    );

    data.append(
      "isNewArrival",
      String(formData.isNewArrival)
    );

    data.append(
      "isBestSeller",
      String(formData.isBestSeller)
    );

    data.append("color", formData.color);

    // =================================================
    // COLLECTIONS
    // =================================================

    formData.collections.forEach((id) => {
      data.append("collections", id);
    });

    // =================================================
    // SIZE
    // =================================================

    formData.size.forEach((size) => {
      data.append("size", size);
    });

    // =================================================
    // IMAGES
    // =================================================

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      if (editingProduct) {
        await dispatch(
          updateProductThunk({
            id: editingProduct._id,
            formData: data,
          })
        ).unwrap();
      } else {
        await dispatch(
          createProductThunk(data)
        ).unwrap();
      }

      setShowModal(false);
      setEditingProduct(null);

      resetForm();

      await dispatch(getProductsThunk()).unwrap();
    } catch (error) {
      console.error(
        "Product Submit Error:",
        error
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (!deleteProduct?._id) return;

    try {
      await dispatch(
        deleteProductThunk(deleteProduct._id)
      ).unwrap();

      setDeleteProduct(null);

      await dispatch(getProductsThunk()).unwrap();
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredProducts = products.filter(
    (product) => {
      const searchText =
        search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.brand
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // =====================================================
  // CLOSE MENU WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    if (openMenu) {
      document.addEventListener(
        "click",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, [openMenu]);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="space-y-4">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mt-2 flex items-center justify-between md:mt-0">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#293b25]/10 text-[#293b25]">
            <FiPackage size={18} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[#293b25]">
              Products
            </h1>

            <p className="text-[10px] text-gray-400">
              Manage your products
            </p>
          </div>

        </div>

        <button
          onClick={handleAdd}
          className="
            flex h-10 items-center gap-2
            rounded-xl
            bg-[#293b25]
            px-4
            text-[10px]
            font-medium
            text-white
            transition
            hover:bg-[#1f2e1c]
          "
        >
          <FiPlus size={15} />
          Add Product
        </button>

      </div>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        {/* TOTAL */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <FiLayers size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Total Products
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {NoOfProducts}
            </p>
          </div>

        </div>

        {/* ACTIVE */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FiCheck size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Active
            </p>

            <p className="mt-1 text-xl font-bold text-green-600">
              {activeProducts}
            </p>
          </div>

        </div>

        {/* INACTIVE */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <FiPackage size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Inactive
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {inActiveProducts}
            </p>
          </div>

        </div>

        {/* FEATURED */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <FiStar size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Featured
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {featuredProducts}
            </p>
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">

          <span>{error}</span>

          <button
            onClick={fetchProducts}
            className="font-medium underline"
          >
            Retry
          </button>

        </div>
      )}

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3">

        <FiSearch
          size={14}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search product..."
          className="
            flex-1
            bg-transparent
            text-xs
            outline-none
          "
        />

      </div>

      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

        {/* DESKTOP HEADER */}

        <div
          className="
            hidden
            grid-cols-[50px_minmax(180px,1.5fr)_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr]
            items-center
            gap-4
            border-b
            border-gray-100
            bg-gray-50
            px-4
            py-3
            sm:grid
          "
        >

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Image
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Product
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Category
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Price
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Stock
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Status
          </span>

          <span className="text-[9px] font-semibold uppercase text-gray-400">
            Actions
          </span>

        </div>

        {/* EMPTY */}

        {filteredProducts.length === 0 ? (

          <div className="py-16 text-center">

            <FiPackage
              size={25}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-xs text-gray-500">
              No products found
            </p>

          </div>

        ) : (

          <div>

            {filteredProducts.map((product) => (
                <div
                key={product._id}
                className="
                border-b
                border-gray-100
                last:border-b-0
                transition
                hover:bg-gray-50/50
                "
                >

                {/* ================================================= */}
                {/* DESKTOP */}
                {/* ================================================= */}

                <div
                  className="
                    hidden
                    grid-cols-[50px_minmax(180px,1.5fr)_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr]
                    items-center
                    gap-4
                    px-4
                    py-3
                    sm:grid
                  "
                >

                  {/* IMAGE */}

                  <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">

                    {product.images?.[0] ? (

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-gray-300">
                        <FiImage />
                      </div>

                    )}

                  </div>

                  {/* PRODUCT */}

                  <div className="min-w-0">

                    <h3 className="truncate text-xs font-semibold text-gray-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 truncate text-[9px] text-gray-400">
                      {product.description ||
                        "No description"}
                    </p>

                    {product.brand && (
                      <p className="mt-1 text-[8px] text-gray-400">
                        {product.brand}
                      </p>
                    )}

                  </div>

                  {/* PRICE */}
                    <p className="text-[10px] font-semibold text-gray-600">
                      {product?.category?.name}
                    </p>

                  <div>


                    <p className="text-[10px] font-semibold text-gray-800">
                      ₹{product.price}
                    </p>

                    {product.basePrice && (
                      <p className="mt-1 text-[9px] text-gray-400 line-through">
                        ₹{product.basePrice}
                      </p>
                    )}

                  </div>

                  {/* STOCK */}

                  <div>

                    <p
                      className={`text-[10px] font-semibold ${
                        Number(product.stock) > 0
                          ? "text-gray-700"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock ?? 0}
                    </p>

                    <p className="mt-1 text-[9px] text-gray-400">
                      Stock
                    </p>

                  </div>

                  {/* STATUS */}

                  <div className="flex items-center">

                    <button
                      disabled={
                        toggleLoading ===
                        product._id
                      }
                      onClick={() =>
                        handleToggleActive(
                          product
                        )
                      }
                      className={`
                        relative
                        h-5
                        w-9
                        shrink-0
                        rounded-full
                        transition
                        duration-200
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          product.isActive
                            ? "bg-[#293b25]"
                            : "bg-gray-300"
                        }
                      `}
                    >

                      <span
                        className={`
                          absolute
                          top-0.5
                         
                          h-4
                          w-4
                          rounded-full
                          bg-white
                          shadow-sm
                          transition-transform
                          duration-200
                          ${
                            product.isActive
                              ? "translate-x-0.8"
                              : " left-0"
                          }
                        `}
                      />

                    </button>

                    <span
                      className={`
                        ml-2
                        text-[9px]
                        font-medium
                        ${
                          product.isActive
                            ? "text-[#293b25]"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {toggleLoading ===
                      product._id
                        ? "..."
                        : product.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-1">

                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-[#293b25]
                      "
                    >
                      <FiEdit2 size={14} />
                    </button>

                    <button
                      onClick={() =>
                        setDeleteProduct(
                          product
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                      "
                    >
                      <FiTrash2 size={14} />
                    </button>

                  </div>

                </div>

                {/* ================================================= */}
                {/* MOBILE */}
                {/* ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    sm:hidden
                  "
                >

                  {/* IMAGE */}

                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                    {product.images?.[0] ? (

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-gray-300">
                        <FiImage size={15} />
                      </div>

                    )}

                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-[11px] font-semibold text-gray-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 max-w-40 w-50 truncate text-[9px] text-gray-400">
                      {product.description ||
                        "No description"}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-[10px] font-semibold text-gray-800">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400 line-through">
                        ₹{product.basePrice}
                      </span>

                      <span
                        className={`text-[9px] ml-4 ${
                          Number(product.stock) > 0
                            ? "text-gray-400"
                            : "text-red-500"
                        }`}
                      >
                        Stock: {product.stock ?? 0}
                      </span>

                    </div>

                  </div>

                  {/* STATUS DOT */}

                  <div
                    className={`
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      ${
                        product.isActive
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }
                    `}
                  />

                  {/* THREE DOT */}

                  <div
                    className="relative shrink-0"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu ===
                            product._id
                            ? null
                            : product._id
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        hover:bg-gray-100
                      "
                    >
                      <FiMoreVertical
                        size={16}
                      />
                    </button>

                    {openMenu ===
                      product._id && (

                      <div
                        className="
                          absolute
                          right-0
                          top-9
                          z-30
                          w-36
                          overflow-hidden
                          rounded-xl
                          border
                          border-gray-100
                          bg-white
                          p-1
                          shadow-xl
                        "
                      >

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-gray-600
                            hover:bg-gray-50
                          "
                        >
                          <FiEdit2 size={13} />
                          Edit
                        </button>

                        {/* TOGGLE */}

                        <button
                          disabled={
                            toggleLoading ===
                            product._id
                          }
                          onClick={() =>
                            handleToggleActive(
                              product
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-gray-600
                            hover:bg-gray-50
                            disabled:opacity-50
                          "
                        >

                          {product.isActive ? (
                            <FiToggleRight
                              size={14}
                            />
                          ) : (
                            <FiToggleLeft
                              size={14}
                            />
                          )}

                          {product.isActive
                            ? "Make Inactive"
                            : "Make Active"}

                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() => {
                            setOpenMenu(null);
                            setDeleteProduct(
                              product
                            );
                          }}
                          className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-red-500
                            hover:bg-red-50
                          "
                        >
                          <FiTrash2 size={13} />
                          Delete
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ================================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-[650px]
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >

            {/* HEADER */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                bg-white
                px-5
                py-4
              "
            >

              <div>

                <h2 className="text-sm font-semibold text-[#293b25]">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="mt-1 text-[9px] text-gray-400">
                  {editingProduct
                    ? "Update product details"
                    : "Create a new product"}
                </p>

              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-400
                  hover:bg-gray-100
                "
              >
                <FiX size={16} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >

              {/* IMAGES */}

              <div>

                <label className="mb-2 block text-[10px] font-medium text-gray-600">
                  Product Images
                </label>

                <div className="flex flex-wrap gap-2">

                  {formData.imagePreviews.map(
                    (image, index) => (

                      <div
                        key={`${image}-${index}`}
                        className="
                          relative
                          h-20
                          w-20
                          overflow-hidden
                          rounded-xl
                          border
                        "
                      >

                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="
                            absolute
                            right-1
                            top-1
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-black/60
                            text-white
                          "
                        >
                          <FiX size={10} />
                        </button>

                      </div>

                    )
                  )}

                  <label
                    className="
                      flex
                      h-20
                      w-20
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-gray-300
                      text-gray-400
                      hover:border-[#293b25]
                    "
                  >

                    <FiUpload size={18} />

                    <span className="mt-1 text-[8px]">
                      Upload
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />

                  </label>

                </div>

                <p className="mt-1 text-[8px] text-gray-400">
                  JPG, PNG, WEBP · Max 5MB each
                </p>

              </div>

              {/* NAME */}

              <div>

                <label className="mb-1 block text-[10px] font-medium text-gray-600">
                  Product Name
                </label>

                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter product name"
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-1 block text-[10px] font-medium text-gray-600">
                  Description
                </label>

                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description:
                        e.target.value,
                    }))
                  }
                  placeholder="Product description"
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

              </div>

              {/* PRICE */}

              <div className="grid grid-cols-2 gap-3">

                <input
                  type="number"
                  required
                  min="0"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="
                    h-10
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

                <input
                  type="number"
                  min="0"
                  placeholder="Base Price"
                  value={formData.basePrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      basePrice:
                        e.target.value,
                    }))
                  }
                  className="
                    h-10
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-1 block text-[10px] font-medium text-gray-600">
                  Category
                </label>

                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (

                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* COLLECTIONS */}

              <div>

                <label className="mb-1 block text-[10px] font-medium text-gray-600">
                  Collections
                </label>

                <div
                  className="
                    grid
                    max-h-[118px]
                    grid-cols-1
                    gap-2
                    overflow-y-auto
                    rounded-lg
                    border
                    border-gray-200
                    p-2
                    sm:grid-cols-2
                  "
                >

                  {collections?.map(
                    (collection) => {

                      const isSelected =
                        formData.collections.includes(
                          collection._id
                        );

                      return (
                        <label
                          key={collection._id}
                          className={`
                            flex
                            h-[48px]
                            cursor-pointer
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-2.5
                            transition
                            ${
                              isSelected
                                ? "border-[#293b25] bg-[#293b25]/5"
                                : "border-gray-100 hover:bg-gray-50"
                            }
                          `}
                        >

                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {

                              setFormData(
                                (prev) => {

                                  const exists =
                                    prev.collections.includes(
                                      collection._id
                                    );

                                  return {
                                    ...prev,

                                    collections:
                                      exists
                                        ? prev.collections.filter(
                                            (id) =>
                                              id !==
                                              collection._id
                                          )
                                        : [
                                            ...prev.collections,
                                            collection._id,
                                          ],
                                  };
                                }
                              );
                            }}
                            className="
                              h-3.5
                              w-3.5
                              shrink-0
                              accent-[#293b25]
                            "
                          />

                          {collection.image ? (

                            <img
                              src={collection.image}
                              alt={
                                collection.name
                              }
                              className="
                                h-8
                                w-8
                                shrink-0
                                rounded-md
                                object-cover
                              "
                            />

                          ) : (

                            <div className="h-8 w-8 shrink-0 rounded-md bg-gray-100" />

                          )}

                          <span className="truncate text-[9px] font-medium text-gray-700">
                            {collection.name}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </div>

              {/* BRAND + STOCK */}

              <div className="grid grid-cols-2 gap-3">

                <input
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      brand: e.target.value,
                    }))
                  }
                  placeholder="Brand"
                  className="
                    h-10
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stock: e.target.value,
                    }))
                  }
                  placeholder="Stock"
                  className="
                    h-10
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                  "
                />

              </div>

              {/* SIZE */}

              <div>

                <label className="mb-1 block text-[10px] font-medium text-gray-600">
                  Sizes
                </label>

                <div className="flex gap-2">

                  <input
                    value={sizeInput}
                    onChange={(e) =>
                      setSizeInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        e.preventDefault();
                        addSize();
                      }

                    }}
                    placeholder="Enter size"
                    className="
                      h-10
                      flex-1
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      text-xs
                      outline-none
                      focus:border-[#293b25]
                    "
                  />

                  <button
                    type="button"
                    onClick={addSize}
                    className="
                      rounded-lg
                      bg-gray-100
                      px-4
                      text-xs
                      hover:bg-gray-200
                    "
                  >
                    Add
                  </button>

                </div>

                <div className="mt-2 flex flex-wrap gap-2">

                  {formData.size.map(
                    (size) => (

                      <span
                        key={size}
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-gray-100
                          px-2.5
                          py-1.5
                          text-[9px]
                        "
                      >

                        {size}

                        <button
                          type="button"
                          onClick={() =>
                            removeSize(size)
                          }
                        >
                          <FiX size={10} />
                        </button>

                      </span>

                    )
                  )}

                </div>

              </div>

              {/* TOGGLES */}

              <div className="grid grid-cols-2 gap-3">

                {[
                  ["isAvailable", "Available"],
                  ["isActive", "Active"],
                  ["isNewArrival", "New Arrival"],
                  ["isBestSeller", "Best Seller"],
                ].map(
                  ([key, label]) => (

                    <label
                      key={key}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-gray-200
                        px-3
                        py-2.5
                      "
                    >

                      <span className="text-[9px] text-gray-600">
                        {label}
                      </span>

                      <input
                        type="checkbox"
                        checked={
                          formData[key]
                        }
                        onChange={(e) =>
                          setFormData(
                            (prev) => ({
                              ...prev,
                              [key]:
                                e.target.checked,
                            })
                          )
                        }
                      />

                    </label>

                  )
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                  className="
                    h-10
                    flex-1
                    rounded-lg
                    border
                    text-[10px]
                    text-gray-600
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    h-10
                    flex-1
                    rounded-lg
                    bg-[#293b25]
                    text-[10px]
                    font-medium
                    text-white
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Saving..."
                    : editingProduct
                    ? "Save Changes"
                    : "Create Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteProduct && (

        <div
          className="
            fixed
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-[360px]
              rounded-2xl
              bg-white
              p-6
              text-center
            "
          >

            <FiTrash2
              size={22}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-3 text-sm font-semibold">
              Delete Product?
            </h3>

            <p className="mt-2 text-[10px] text-gray-400">
              Are you sure you want to delete{" "}
              <b>{deleteProduct.name}</b>?
            </p>

            <div className="mt-5 flex gap-2">

              <button
                onClick={() =>
                  setDeleteProduct(null)
                }
                className="
                  h-10
                  flex-1
                  rounded-lg
                  border
                  text-[10px]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="
                  h-10
                  flex-1
                  rounded-lg
                  bg-red-500
                  text-[10px]
                  text-white
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Products;