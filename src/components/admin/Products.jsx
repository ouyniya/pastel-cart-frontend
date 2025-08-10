import { useState } from "react";
import { toast } from "react-toastify";
import { removeProduct, updateProduct } from "../../api/product";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import UpdateProductModal from "./UpdateProductModal";

const Products = ({
  onSuccess,
  product = [],
  loading,
  lastAddedId,
  lastUpdatedId,
  setLastUpdatedId,
  setCurrentPage,
  currentPage,
  totalPages,
  categories,
}) => {
  const [form, setForm] = useState(null);
  const [productId, setProductId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const removeProductData = async (id) => {
    if (!id.trim()) return toast.warning("No product selected");
    setRemovingId(id);
    try {
      await removeProduct(id);
      toast.success("Removed successfully");
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  const handleSetInitialValueForProduct = (id) => {
    setProductId(id);
    const data = product.find((p) => p.id === id);
    setForm({
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      categoryId: data.category.id,
      images: [],
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };

  const updateProductData = async (id) => {
    if (!id.trim()) return toast.warning("No product selected");
    try {
      setUpdating(true);
      await updateProduct(id, form);
      setLastUpdatedId(id);
      toast.success("Updated successfully");
      onSuccess?.();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full h-full card bg-base-100 shadow-sm p-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-serif text-lg">Manage Products</h1>
            <p className="mb-2 text-sm opacity-50">
              Edit, update, or remove products 🛍️
            </p>
          </div>
          <Pagination
            {...{ currentPage, totalPages, onSuccess, setCurrentPage }}
          />
        </div>

        <div className="max-h-[250px] overflow-auto">
          {loading ? (
            <div className="flex justify-center h-[150px] items-center">
              <span className="loading loading-spinner text-secondary"></span>
            </div>
          ) : (
            <ProductTable
              {...{
                product,
                loading,
                lastUpdatedId,
                lastAddedId,
                removingId,
                setIsOpen,
                handleSetInitialValueForProduct,
                removeProductData,
              }}
            />
          )}
        </div>
      </div>

      <UpdateProductModal
        {...{
          isOpen,
          onClose: () => setIsOpen(false),
          form,
          handleOnchange,
          updateProductData,
          updating,
          categories,
          productId,
        }}
      />
    </div>
  );
};

export default Products;
