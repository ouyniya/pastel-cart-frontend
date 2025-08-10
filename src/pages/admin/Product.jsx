import Products from "../../components/admin/Products";
import FormProduct from "../../components/admin/FormProduct";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../api/product";
import { IMAGE_MAP, ITEMS_PER_PAGE, REST_IMAGE } from "../../utils/constant";
import { getCategory } from "../../api/category";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [lastUpdatedId, setLastUpdatedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCategories = async () => {
    try {
      setFetchLoading(true);
      const res = await getCategory();
      const categoryData = res.data;

      const withImage = categoryData.map((item) => ({
        ...item,
        image: IMAGE_MAP[item.name] || REST_IMAGE,
      }));

      setTimeout(() => {
        setCategories(withImage);
        setFetchLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
      toast.error("Error loading categories");
    }
  };

  const fetchProducts = async (pageNumber) => {
    const page = +pageNumber;
    const limit = ITEMS_PER_PAGE;
    setLoading(true);

    try {
      const res = await getProducts(page, limit);
      const data = res.data.products;

      setTimeout(() => {
        setProductData(data);
        setTotalItems(res.data.total);
        setCurrentPage(res.data.page);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Zod error
      if (Array.isArray(error?.response?.data?.errors)) {
        const mergeError = error?.response?.data?.errors?.map(
          (err) => err.message
        );
        const errMsg = mergeError.join(", ");
        toast.error(errMsg);
        return;
      }

      // Normal error
      const errMsg = error?.response?.data?.errors || "Error loading products";
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!lastAddedId) return;

    const resetLastAddedId = () => setLastAddedId(null);
    const timerId = setTimeout(resetLastAddedId, 1500);

    return () => clearTimeout(timerId);
  }, [lastAddedId]);

  useEffect(() => {
    if (!lastUpdatedId) return;

    const resetLastUpdatedId = () => setLastUpdatedId(null);
    const timerId = setTimeout(resetLastUpdatedId, 1500);

    return () => clearTimeout(timerId);
  }, [lastUpdatedId]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-5xl">
      <div className="header flex flex-col gap-2">
        <h1 className="font-serif text-3xl">Product</h1>
        <p className="text-sm opacity-75">
          Let’s keep things tidy! Give your products a cozy category to call
          home 🏠📦
        </p>
      </div>

      <Products
        categories={categories}
        product={productData}
        loading={loading}
        lastAddedId={lastAddedId}
        lastUpdatedId={lastUpdatedId}
        setLastUpdatedId={setLastUpdatedId}
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onSuccess={(pageNumber) => {
          fetchProducts(pageNumber);
        }}
      />

      <FormProduct
        categories={categories}
        fetchLoading={fetchLoading}
        setLastAddedId={setLastAddedId}
        onSuccess={() => {
          fetchProducts();
          console.log("👋 Product created!");
        }}
      />
    </div>
  );
};
export default Product;
