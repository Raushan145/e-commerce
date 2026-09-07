const RECENTLY_VIEWED_KEY = "ecom_recently_viewed";

export const getRecentlyViewed = () => {
  try {
    const storedProducts = JSON.parse(
      localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]",
    );

    return Array.isArray(storedProducts) ? storedProducts.slice(0, 10) : [];
  } catch {
    return [];
  }
};

export const saveRecentlyViewed = (product) => {
  if (!product?._id) {
    return getRecentlyViewed();
  }

  const productsWithoutCurrent = getRecentlyViewed().filter(
    (item) => item._id !== product._id,
  );
  const updatedProducts = [product, ...productsWithoutCurrent].slice(0, 10);

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedProducts));
  window.dispatchEvent(new Event("recentlyViewedUpdated"));

  return updatedProducts;
};

export const RECENTLY_VIEWED_STORAGE_KEY = RECENTLY_VIEWED_KEY;
