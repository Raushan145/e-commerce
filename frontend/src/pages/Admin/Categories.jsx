

import React, { useEffect, useMemo, useState } from "react";

import {
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiLayers,
  FiPackage,
  FiX,
  FiUpload,
  FiImage,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  getCategoriesThunk,
  updateCategoryThunk,
} from "../../redux/category/categoryThunk";


const Categories = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
    successMessage,
  } = useSelector((state) => state.category);

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [deleteCategory, setDeleteCategory] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    imagePreview: "",
  });

  // =====================================================
  // GET CATEGORIES
  // =====================================================

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

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

  // =====================================================
  // ADD
  // =====================================================

  const handleAdd = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      image: null,
      imagePreview: "",
    });

    setShowModal(true);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      image: null,
      imagePreview: category.image || "",
    });

    setShowModal(true);

    setOpenMenu(null);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    // CREATE
    if (!editingCategory) {
      if (!formData.image) {
        alert("Please select category image.");
        return;
      }

      const result = await dispatch(
        createCategoryThunk({
          name: formData.name,
          image: formData.image,
        })
      );

      if (
        createCategoryThunk.fulfilled.match(result)
      ) {
        setShowModal(false);

        setFormData({
          name: "",
          image: null,
          imagePreview: "",
        });
      }

      return;
    }

    // UPDATE
    const result = await dispatch(
      updateCategoryThunk({
        id: editingCategory._id,

        data: {
          name: formData.name,
          image: formData.image,
        },
      })
    );

    if (
      updateCategoryThunk.fulfilled.match(result)
    ) {
      setShowModal(false);

      setEditingCategory(null);

      setFormData({
        name: "",
        image: null,
        imagePreview: "",
      });
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (!deleteCategory) return;

    const result = await dispatch(
      deleteCategoryThunk(deleteCategory._id)
    );

    if (
      deleteCategoryThunk.fulfilled.match(result)
    ) {
      setDeleteCategory(null);
      setOpenMenu(null);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalCategories = categories.length;

  const totalProducts = categories.reduce(
    (total, category) =>
      total + (category.products?.length || 0),
    0
  );

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="space-y-4">

      {/* HEADER */}

      <div className="mt-2 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#293b25]/10 text-[#293b25]">
            <FiLayers size={18} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[#293b25]">
              Categories
            </h1>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Manage your product categories
            </p>
          </div>

        </div>

        <button
          onClick={handleAdd}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#293b25] px-4 text-[10px] font-medium text-white transition hover:bg-[#1f2e1c]"
        >
          <FiPlus size={15} />

          <span className="hidden sm:inline">
            Add Category
          </span>

          <span className="sm:hidden">
            Add
          </span>
        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-3">

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <FiLayers size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Total Categories
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {totalCategories}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiPackage size={17} />
          </div>

          <div>
            <p className="text-[9px] text-gray-400">
              Total Products
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {totalProducts}
            </p>
          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-3">

        <div className="flex h-9 w-full max-w-[320px] items-center gap-2 rounded-lg bg-[#f7f7f4] px-3">

          <FiSearch
            size={14}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-transparent text-[10px] outline-none placeholder:text-gray-400"
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-visible rounded-2xl border border-gray-200 bg-white">

        {/* HEADER */}

        <div className="hidden grid-cols-[minmax(300px,1fr)_120px_100px] items-center gap-4 border-b border-gray-100 bg-[#fafaf8] px-5 py-3 lg:grid">

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Category
          </p>

          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Products
          </p>

          <p className="text-center text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Actions
          </p>

        </div>

        {/* LOADING */}

        {loading && categories.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xs text-gray-400">
              Loading categories...
            </p>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="px-5 py-3 text-[10px] text-red-500">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          filteredCategories.length === 0 && (
            <div className="py-16 text-center">

              <FiLayers
                size={25}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-xs text-gray-500">
                No categories found
              </p>

            </div>
          )}

        {/* ROWS */}

        {filteredCategories.map((category) => (

          <div
            key={category._id}
            className="relative border-b border-gray-100 px-3 py-3 transition last:border-b-0 hover:bg-[#fcfcfa] sm:px-4 lg:grid lg:grid-cols-[minmax(300px,1fr)_120px_100px] lg:items-center lg:gap-4 lg:px-5 lg:py-3.5"
          >

            {/* CATEGORY */}

            <div className="flex min-w-0 items-center gap-3">

              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-16 sm:w-16">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />

              </div>

              <div className="min-w-0">

                <h3 className="truncate text-[11px] font-semibold text-gray-800 sm:text-xs">
                  {category.name}
                </h3>

                <div className="mt-1.5 flex items-center gap-1.5">

                  <FiPackage
                    size={11}
                    className="text-gray-400"
                  />

                  <span className="text-[9px] text-gray-500">
                    {category.products?.length || 0} products
                  </span>

                </div>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="hidden lg:block">

              <span className="text-sm font-semibold text-gray-800">
                {category.products?.length || 0}
              </span>

              <span className="ml-1 text-[8px] text-gray-400">
                items
              </span>

            </div>

            {/* ACTIONS */}

            <div className="flex items-center justify-end">

              {/* DESKTOP */}

              <div className="hidden items-center justify-end gap-1 lg:flex">

                <button
                  onClick={() =>
                    handleEdit(category)
                  }
                  title="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#293b25]"
                >
                  <FiEdit2 size={14} />
                </button>

                <button
                  onClick={() =>
                    setDeleteCategory(category)
                  }
                  title="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <FiTrash2 size={14} />
                </button>

              </div>

              {/* MOBILE */}

              <div className="relative lg:hidden">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === category._id
                        ? null
                        : category._id
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                >
                  <FiMoreVertical size={16} />
                </button>

                {openMenu === category._id && (
                  <div className="absolute right-0 top-10 z-50 w-32 rounded-xl border border-gray-200 bg-white p-1 shadow-xl">

                    <button
                      onClick={() =>
                        handleEdit(category)
                      }
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50"
                    >
                      <FiEdit2 size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteCategory(category);
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[10px] text-red-500 hover:bg-red-50"
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

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-[430px] overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

              <div>

                <h2 className="text-sm font-semibold text-[#293b25]">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="mt-1 text-[9px] text-gray-400">
                  {editingCategory
                    ? "Update category details"
                    : "Create a new product category"}
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <FiX size={16} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >

              {/* IMAGE */}

              <div>

                <label className="mb-1.5 block text-[10px] font-medium text-gray-600">
                  Category Image
                </label>

                <div className="flex items-center gap-4">

                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

                    {formData.imagePreview ? (

                      <>
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              image: null,
                              imagePreview: "",
                            }))
                          }
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                        >
                          <FiX size={10} />
                        </button>
                      </>

                    ) : (

                      <div className="flex h-full w-full flex-col items-center justify-center text-gray-300">

                        <FiImage size={22} />

                        <span className="mt-1 text-[7px]">
                          No Image
                        </span>

                      </div>

                    )}

                  </div>

                  <div>

                    <label
                      htmlFor="categoryImage"
                      className="flex h-9 w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 text-[9px] font-medium text-gray-600 hover:border-[#293b25]"
                    >
                      <FiUpload size={13} />

                      {formData.imagePreview
                        ? "Change Image"
                        : "Upload Image"}
                    </label>

                    <input
                      id="categoryImage"
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

              {/* NAME */}

              <div>

                <label className="mb-1.5 block text-[10px] font-medium text-gray-600">
                  Category Name
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
                  placeholder="Enter category name"
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none focus:border-[#293b25]"
                  required
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-2 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="h-10 flex-1 rounded-lg border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-10 flex-1 rounded-lg bg-[#293b25] text-[10px] font-medium text-white hover:bg-[#1f2e1c] disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingCategory
                      ? "Save Changes"
                      : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteCategory && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-[360px] rounded-2xl bg-white p-6 text-center shadow-2xl">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FiTrash2 size={18} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              Delete Category?
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-gray-400">

              Are you sure you want to delete{" "}

              <span className="font-medium text-gray-600">
                "{deleteCategory.name}"
              </span>

              ?

            </p>

            <div className="mt-5 flex gap-2">

              <button
                onClick={() =>
                  setDeleteCategory(null)
                }
                className="h-10 flex-1 rounded-lg border border-gray-200 text-[10px] text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="h-10 flex-1 rounded-lg bg-red-500 text-[10px] font-medium text-white disabled:opacity-50"
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

export default Categories;
