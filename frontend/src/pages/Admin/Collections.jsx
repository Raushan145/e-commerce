import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ServerURL } from "../../App.jsx";
import {
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiLayers,
  FiPackage,
  FiX,
  FiCheck,
  FiStar,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addcollections } from "../../redux/collections/collectionSlice.js";

const Collections = () => {

  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();
   dispatch(addcollections(collections));
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [deleteCollection, setDeleteCollection] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    imagePreview: "",
  });

  
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ServerURL}/api/v1/collection`, {
        withCredentials: true,
      });
      setCollections(response.data.collections || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCollections = setTimeout(fetchCollections, 0);

    return () => clearTimeout(loadCollections);
  }, []);

  const handleImageChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Only image
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB.");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    image: file,
    imagePreview: URL.createObjectURL(file),
  }));
};


  // FILTER

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) => {
      const searchMatch =
        (collection.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (collection.description || "").toLowerCase().includes(search.toLowerCase());

      const filterMatch =
        filter === "All" ||
        (filter === "Active" && collection.isActive) ||
        (filter === "Inactive" && !collection.isActive);

      return searchMatch && filterMatch;
    });
  }, [collections, search, filter]);

  // =========================================================
  // ADD
  // =========================================================

    const handleAdd = () => {
    setEditingCollection(null);

    setFormData({
        name: "",
        description: "",
        image: null,
        imagePreview: "",
    });

    setShowModal(true);
    };

  // EDIT

    const handleEdit = (collection) => {
    setEditingCollection(collection);

    setFormData({
        name: collection.name,
        description: collection.description,
        image: null,
        imagePreview: collection.image || "",
    });

    setShowModal(true);
    setOpenMenu(null);
    };

    // SAVE


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || (!editingCollection && !formData.image)) {
      setError(editingCollection ? "Collection name is required" : "Collection name and image are required");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("description", formData.description.trim());
    if (formData.image) payload.append("image", formData.image);

    try {
      setSubmitting(true);
      const url = editingCollection
        ? `${ServerURL}/api/v1/collection/update/${editingCollection._id}`
        : `${ServerURL}/api/v1/collection/create`;
      const response = editingCollection
        ? await axios.put(url, payload, { withCredentials: true })
        : await axios.post(url, payload, { withCredentials: true });

      if (editingCollection) {
        setCollections((prev) => prev.map((item) =>
          item._id === editingCollection._id ? response.data.collection : item,
        ));
      } else {
        setCollections((prev) => [response.data.collection, ...prev]);
      }
      setShowModal(false);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to save collection");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async () => {
    if (!deleteCollection) return;

    try {
      await axios.delete(`${ServerURL}/api/v1/collection/delete/${deleteCollection._id}`, {
        withCredentials: true,
      });
      setCollections((prev) => prev.filter((item) => item._id !== deleteCollection._id));
      setDeleteCollection(null);
      setOpenMenu(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete collection");
    }
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalCollections = collections.length;

  const activeCollections = collections.filter((item) => item.isActive).length;

  const featuredCollections = collections.filter(
    (item) => item.isFeatured,
  ).length;

  const totalProducts = collections.reduce(
    (total, item) => total + (Array.isArray(item.products) ? item.products.length : item.products || 0),
    0,
  );

  // =========================================================
  // TYPE FORMAT
  // =========================================================

  const formatType = (type) => {
    return (type || "general")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // =========================================================
  // DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "Always active";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="space-y-4">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#293b25]/10
              text-[#293b25]
            "
          >
            <FiLayers size={18} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[#293b25]">
              Collections
            </h1>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Manage your product collections
            </p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
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
          <span className="hidden sm:inline">Add Collection</span>
          <span className="sm:hidden">Add</span>
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
            <p className="text-[9px] text-gray-400">Total Collections</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {totalCollections}
            </p>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FiCheck size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">Active</p>

            <p className="mt-1 text-xl font-bold text-green-600">
              {activeCollections}
            </p>
          </div>
        </div>

        {/* PRODUCTS */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiPackage size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">Total Products</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {totalProducts}
            </p>
          </div>
        </div>

        {/* FEATURED */}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <FiStar size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">Featured</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {featuredCollections}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
          <span>{error}</span>
          <button onClick={fetchCollections} className="font-medium underline">Retry</button>
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-xs text-gray-400">
          Loading collections...
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="
            flex
            h-9
            w-full
            items-center
            gap-2
            rounded-lg
            bg-[#f7f7f4]
            px-3
            sm:max-w-[320px]
          "
        >
          <FiSearch size={14} className="shrink-0 text-gray-400" />

          <input
            type="text"
            placeholder="Search collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              bg-transparent
              text-[10px]
              text-gray-700
              outline-none
              placeholder:text-gray-400
            "
          />
        </div>

        <div className="flex gap-1.5">
          {["All", "Active", "Inactive"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`
                  rounded-lg
                  px-3
                  py-1.5
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
          ))}
        </div>
      </div>

      {/* ================================================= */}
      {/* COLLECTION TABLE */}
      {/* ================================================= */}

      {!loading && <div className="overflow-visible rounded-2xl border border-gray-200 bg-white">
        {/* TABLE HEADER */}

        <div
          className="
            hidden
            lg:grid
            lg:grid-cols-[minmax(300px,1fr)_110px_110px_130px_90px_90px]
            items-center
            gap-4
            border-b
            border-gray-100
            bg-[#fafaf8]
            px-5
            py-3
          "
        >
          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Collection
          </p>

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Products
          </p>

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Type
          </p>

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Status
          </p>

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Created
          </p>

          <p className="text-center text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Actions
          </p>
        </div>

        {/* ROWS */}

        {filteredCollections.length === 0 ? (
          <div className="py-16 text-center">
            <FiLayers size={25} className="mx-auto text-gray-300" />

            <p className="mt-3 text-xs text-gray-500">No collections found</p>
          </div>
        ) : (
          filteredCollections.map((collection) => (
            <div
              key={collection._id}
              className="
                relative
                border-b
                border-gray-100
                px-3
                py-3
                transition
                last:border-b-0
                hover:bg-[#fcfcfa]
                sm:px-4
                lg:grid
                lg:grid-cols-[minmax(300px,1fr)_110px_110px_130px_90px_90px]
                lg:items-center
                lg:gap-4
                lg:px-5
                lg:py-3.5
              "
            >
              {/* ========================================= */}
              {/* COLLECTION INFO */}
              {/* IMAGE + TITLE + DESCRIPTION + PRODUCTS */}
              {/* ========================================= */}

              <div className="flex min-w-0 items-center gap-3">
                {/* IMAGE */}

                <div
                  className="
                    h-14
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    bg-gray-100
                    sm:h-16
                    sm:w-16
                  "
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      hover:scale-105
                    "
                  />
                </div>

                {/* TITLE / DESCRIPTION / PRODUCTS */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-[11px] font-semibold text-gray-800 sm:text-xs">
                      {collection.name}
                    </h3>

                    {collection.isFeatured && (
                      <FiStar
                        size={11}
                        className="shrink-0 fill-current text-yellow-500"
                      />
                    )}
                  </div>

                  <p className="mt-0.5 truncate text-[8px] text-gray-400 sm:text-[9px]">
                    {collection.description}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-medium text-gray-600 sm:text-[10px]">
                      <FiPackage size={11} />
                      {Array.isArray(collection.products) ? collection.products.length : collection.products || 0}
                    </span>

                    <span className="text-[8px] text-gray-300">•</span>

                    <span className="text-[8px] text-gray-400 sm:text-[9px]">
                      products
                    </span>
                  </div>
                </div>
              </div>

              {/* ========================================= */}
              {/* PRODUCTS - DESKTOP */}
              {/* ========================================= */}

              <div className="hidden lg:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-gray-800">
                    {Array.isArray(collection.products) ? collection.products.length : collection.products || 0}
                  </span>

                  <span className="text-[8px] text-gray-400">items</span>
                </div>
              </div>

              {/* ========================================= */}
              {/* TYPE */}
              {/* ========================================= */}

              <div className="hidden lg:block">
                <span className="inline-flex rounded-lg bg-gray-100 px-2.5 py-1.5 text-[8px] font-medium text-gray-600">
                  {formatType(collection.type)}
                </span>
              </div>

              {/* ========================================= */}
              {/* STATUS */}
              {/* ========================================= */}

              <div className="hidden lg:block">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      h-1.5
                      w-1.5
                      rounded-full
                      ${collection.isActive ? "bg-green-500" : "bg-gray-300"}
                    `}
                  />

                  <span
                    className={`
                      text-[9px]
                      font-medium
                      ${
                        collection.isActive ? "text-green-600" : "text-gray-400"
                      }
                    `}
                  >
                    {collection.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* ========================================= */}
              {/* CREATED */}
              {/* ========================================= */}

              <div className="hidden lg:block">
                <p className="text-[9px] text-gray-400">
                  {formatDate(collection.createdAt)}
                </p>
              </div>

              {/* ========================================= */}
              {/* ACTIONS */}
              {/* ========================================= */}

              <div className="flex items-center justify-end">
                {/* DESKTOP */}

                <div className="hidden items-center justify-end gap-1 lg:flex">
                  <button
                    onClick={() => handleEdit(collection)}
                    title="Edit"
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
                    onClick={() => setDeleteCollection(collection)}
                    title="Delete"
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

                {/* MOBILE / TABLET */}

                <div className="relative lg:hidden">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === collection._id ? null : collection._id,
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
                      hover:bg-gray-100
                      hover:text-gray-700
                    "
                  >
                    <FiMoreVertical size={16} />
                  </button>

                  {openMenu === collection._id && (
                    <>
                      {/* OVERLAY */}

                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenMenu(null)}
                      />

                      {/* MENU */}

                      <div
                        className="
                          absolute
                          right-0
                          top-10
                          z-50
                          w-32
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          p-1
                          shadow-xl
                        "
                      >
                        <button
                          onClick={() => handleEdit(collection)}
                          className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-3
                            py-2
                            text-[10px]
                            text-gray-600
                            hover:bg-gray-50
                          "
                        >
                          <FiEdit2 size={13} />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeleteCollection(collection);
                            setOpenMenu(null);
                          }}
                          className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-3
                            py-2
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

              {/* ========================================= */}
              {/* MOBILE STATUS */}
              {/* ========================================= */}

              <div className="ml-[70px] mt-1 flex items-center gap-2 lg:hidden">
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${collection.isActive ? "bg-green-500" : "bg-gray-300"}
                  `}
                />

                <span
                  className={`
                    text-[8px]
                    font-medium
                    ${collection.isActive ? "text-green-600" : "text-gray-400"}
                  `}
                >
                  {collection.isActive ? "Active" : "Inactive"}
                </span>

                <span className="text-[8px] text-gray-300">•</span>

                <span className="text-[8px] text-gray-400">
                  {formatType(collection.type)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>}

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
              w-full
              max-w-[450px]
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-[#293b25]">
                  {editingCollection ? "Edit Collection" : "Add Collection"}
                </h2>

                <p className="mt-1 text-[9px] text-gray-400">
                  {editingCollection
                    ? "Update collection details"
                    : "Create a new product collection"}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
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

            <form onSubmit={handleSubmit} className="space-y-4 p-5">

            {/* IMAGE UPLOAD */}
            <div>
                <label className="mb-1.5 block text-[10px] font-medium text-gray-600">
                Collection Image
                </label>

                <div className="flex items-center gap-4">

                {/* IMAGE PREVIEW */}
                <div className="
                    relative
                    h-20
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                ">
                    {formData.imagePreview ? (
                    <>
                        <img
                        src={formData.imagePreview}
                        alt="Collection preview"
                        className="h-full w-full object-cover"
                        />

                        {/* REMOVE IMAGE */}
                        <button
                        type="button"
                        onClick={() =>
                            setFormData((prev) => ({
                            ...prev,
                            image: null,
                            imagePreview: "",
                            }))
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
                            hover:bg-black/80
                        "
                        >
                        <FiX size={10} />
                        </button>
                    </>
                    ) : (
                    <div className="
                        flex
                        h-full
                        w-full
                        flex-col
                        items-center
                        justify-center
                        text-gray-300
                    ">
                        <FiImage size={22} />

                        <span className="mt-1 text-[7px]">
                        No Image
                        </span>
                    </div>
                    )}
                </div>

                {/* UPLOAD BUTTON */}
                <div className="flex-1">
                    <label
                    htmlFor="collectionImage"
                    className="
                        flex
                        h-9
                        w-fit
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-3
                        text-[9px]
                        font-medium
                        text-gray-600
                        transition
                        hover:border-[#293b25]
                        hover:bg-gray-50
                    "
                    >
                    <FiUpload size={13} />

                    {formData.imagePreview
                        ? "Change Image"
                        : "Upload Image"}
                    </label>

                    <input
                    id="collectionImage"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    />

                    <p className="mt-1.5 text-[8px] text-gray-400">
                    JPG, PNG or WEBP · Max 5MB
                    </p>
                </div>

                </div>
            </div>


            {/* COLLECTION NAME */}
            <div>
                <label className="mb-1.5 block text-[10px] font-medium text-gray-600">
                Collection Name
                </label>

                <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                    setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                    }))
                }
                placeholder="Enter collection name"
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
                required
                />
            </div>


            {/* DESCRIPTION */}
            <div>
                <label className="mb-1.5 block text-[10px] font-medium text-gray-600">
                Description
                </label>

                <textarea
                value={formData.description}
                onChange={(e) =>
                    setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                    }))
                }
                placeholder="Short description"
                rows={3}
                className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2.5
                    text-xs
                    outline-none
                    focus:border-[#293b25]
                "
                />
            </div>


            {/* BUTTONS */}
            <div className="flex gap-2 pt-2">

                <button
                type="button"
                onClick={() => setShowModal(false)}
                className="
                    h-10
                    flex-1
                    rounded-lg
                    border
                    border-gray-200
                    text-[10px]
                    font-medium
                    text-gray-600
                    transition
                    hover:bg-gray-50
                "
                >
                Cancel
                </button>

                <button
                type="submit"
                className="
                    h-10
                    flex-1
                    rounded-lg
                    bg-[#293b25]
                    text-[10px]
                    font-medium
                    text-white
                    transition
                    hover:bg-[#1f2e1c]
                "
                >
                {submitting ? "Saving..." : editingCollection
                    ? "Save Changes"
                    : "Create Collection"}
                </button>

            </div>

            </form>

          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {deleteCollection && (
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
              shadow-2xl
            "
          >
            <div
              className="
                mx-auto
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-500
              "
            >
              <FiTrash2 size={18} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              Delete Collection?
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-600">
                "{deleteCollection.name}"
              </span>
              ?
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setDeleteCollection(null)}
                className="
                  h-10
                  flex-1
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
                  h-10
                  flex-1
                  rounded-lg
                  bg-red-500
                  text-[10px]
                  font-medium
                  text-white
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

export default Collections;
