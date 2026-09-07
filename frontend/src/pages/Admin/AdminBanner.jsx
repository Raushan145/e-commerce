import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUpload,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import {
  createBannerThunk,
  getAllBannersThunk,
  updateBannerThunk,
  deleteBannerThunk,
} from "../../redux/Banner/bannerThunk";

const initialForm = {
  tag: "",
  title: "",
  subtitle: "",
  description: "",
  buttonText: "SHOP NOW",
  buttonLink: "/shop",
  sortOrder: 0,
  isActive: true,
};

const AdminBanner = () => {
  const dispatch = useDispatch();

  const { banners = [], loading, error } = useSelector((state) => state.banner);

  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] =
    useState(null);

  const [form, setForm] =
    useState(initialForm);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    dispatch(getAllBannersThunk());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const openCreate = () => {
    setEditingBanner(null);
    setForm(initialForm);
    setImage(null);
    setPreview("");
    setSubmitError("");
    setShowForm(true);
  };

  const openEdit = (banner) => {
    setEditingBanner(banner);

    setForm({
      tag: banner.tag || "",
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      description: banner.description || "",
      buttonText:
        banner.buttonText || "SHOP NOW",
      buttonLink:
        banner.buttonLink || "/shop",
      sortOrder: banner.sortOrder || 0,
      isActive: banner.isActive,
    });

    setImage(null);
    setPreview(banner.image || "");
    setSubmitError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBanner(null);
    setImage(null);
    setPreview("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const formData = new FormData();

    Object.entries(form).forEach(
      ([key, value]) => {
        formData.append(key, value);
      }
    );

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingBanner) {
        await dispatch(
          updateBannerThunk({
            id: editingBanner._id,
            formData,
          }),
        ).unwrap();
      } else {
        if (!image) {
          setSubmitError("Please select a banner image.");
          return;
        }

        await dispatch(createBannerThunk(formData)).unwrap();
      }

      closeForm();
      dispatch(getAllBannersThunk());
    } catch (requestError) {
      setSubmitError(requestError || "Unable to save banner.");
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this banner?"
    );

    if (!confirmDelete) return;

    dispatch(deleteBannerThunk(id)).then(() => {
      dispatch(getAllBannersThunk());
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mx-auto max-w-[1400px]">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
              Store Management
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-[#293b25]">
              Banners
            </h1>

            <p className="mt-1 text-xs text-gray-400">
              Manage homepage promotional banners
            </p>
          </div>

          <button
            onClick={openCreate}
            className="
              flex items-center justify-center gap-2
              rounded-lg
              bg-[#293b25]
              px-4 py-2.5
              text-xs font-medium text-white
              transition hover:bg-[#1d2b1a]
            "
          >
            <FiPlus size={15} />
            Add Banner
          </button>

        </div>

        {/* BANNERS */}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {loading ? (
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white"
              >
                <div className="h-48 bg-gray-100" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-gray-100" />
                  <div className="h-3 w-full rounded bg-gray-100" />
                </div>
              </div>
            ))
          ) : banners.length === 0 ? (
            <div className="col-span-full flex min-h-[300px] items-center justify-center rounded-2xl bg-white">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  No banners found
                </p>

                <button
                  onClick={openCreate}
                  className="mt-3 text-xs font-medium text-[#293b25]"
                >
                  + Create your first banner
                </button>
              </div>
            </div>
          ) : (
            banners.map((banner) => (
              <div
                key={banner._id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-gray-100
                  bg-white
                  shadow-sm
                  transition
                  hover:shadow-md
                "
              >

                {/* IMAGE */}

                <div className="relative aspect-[16/8] overflow-hidden bg-gray-100">

                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3">

                    <span
                      className={`
                        rounded-full px-2.5 py-1
                        text-[9px] font-medium
                        ${
                          banner.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {banner.isActive
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </span>

                  </div>

                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] text-gray-500 backdrop-blur">
                    #{banner.sortOrder}
                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-4">

                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    {banner.tag}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-[#293b25]">
                    {banner.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {banner.subtitle}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-400">
                    {banner.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">

                    <span className="text-[10px] text-gray-400">
                      {banner.buttonText}
                    </span>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openEdit(banner)
                        }
                        className="
                          flex h-8 w-8 items-center
                          justify-center rounded-lg
                          bg-gray-50 text-gray-500
                          hover:bg-gray-100
                        "
                      >
                        <FiEdit2 size={13} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(banner._id)
                        }
                        className="
                          flex h-8 w-8 items-center
                          justify-center rounded-lg
                          bg-red-50 text-red-400
                          hover:bg-red-100
                        "
                      >
                        <FiTrash2 size={13} />
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>

      {/* FORM MODAL */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">

              <div>
                <h2 className="text-lg font-semibold text-[#293b25]">
                  {editingBanner
                    ? "Edit Banner"
                    : "Create Banner"}
                </h2>

                <p className="text-[10px] text-gray-400">
                  Homepage banner settings
                </p>
              </div>

              {error && (
                <p className="mt-3 text-xs text-red-500">{error}</p>
              )}

              <button
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500"
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              {/* IMAGE */}

              <label className="block cursor-pointer">

                <div className="overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center text-gray-400">
                      <FiUpload size={25} />
                      <p className="mt-2 text-xs">
                        Upload Banner Image
                      </p>
                    </div>
                  )}

                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />

              </label>

              {/* TAG */}

              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Tag e.g. NEW COLLECTION"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
              />

              {/* TITLE */}

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
              />

              {/* SUBTITLE */}

              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
              
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
              />

              {/* DESCRIPTION */}

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
              />

              <div className="grid gap-4 sm:grid-cols-2">

                <input
                  name="buttonText"
                  value={form.buttonText}
                  onChange={handleChange}
                  placeholder="Button text"
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
                />

                <input
                  name="buttonLink"
                  value={form.buttonLink}
                  onChange={handleChange}
                  placeholder="Button link e.g. /shop"
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
                />

              </div>

              {submitError && (
                <p className="text-xs text-red-500">{submitError}</p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">

                <input
                  name="sortOrder"
                  type="number"
                  value={form.sortOrder}
                  onChange={handleChange}
                  placeholder="Sort order"
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#293b25]"
                />

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />

                  Active Banner

                </label>

              </div>

              <button
                type="submit"
                className="
                  flex w-full items-center
                  justify-center rounded-lg
                  bg-[#293b25]
                  py-3
                  text-sm font-medium text-white
                  hover:bg-[#1d2b1a]
                "
              >
                {editingBanner
                  ? "UPDATE BANNER"
                  : "CREATE BANNER"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBanner;