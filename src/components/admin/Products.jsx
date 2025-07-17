import { useState } from "react";
import {
  Boxes,
  BoxIcon,
  CoinsIcon,
  PencilLine,
  Settings2,
  Sparkle,
  Sticker,
  Trash,
} from "lucide-react";
import { toast } from "react-toastify";
import { removeProduct, updateProduct } from "../../api/product";
import Modal from "../Modal";

const Products = ({
  onSuccess,
  product = [],
  loading,
  lastAddedId,
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

  const removeProductData = async (productId) => {
    if (!productId.trim()) {
      return toast.warning("No product to cuddle with 😢");
    }

    setRemovingId(productId); // set id ที่กำลังลบ

    try {
      await removeProduct(productId).then(() => {
        toast.success("🦄 Remove Product Success");
        setTimeout(() => {
          onSuccess?.();
          setRemovingId(null); // clear id ที่ลบหลังโหลดใหม่
        }, 3000);
      });
    } catch (error) {
      console.log(error);
      setRemovingId(null);

      // Normal error
      const errMsg = error?.response?.data?.errors || "Something went wrong";
      toast.error(errMsg);
    }
  };

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      if (name === "price" || name === "quantity") {
        return { ...prev, [name]: +value };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSetInitialValueForProduct = (productId) => {
    setProductId(productId);
    setForm(null);

    const initialProductData = product.filter((item) => item.id === productId);

    const initialProduct = {
      title: initialProductData[0].title,
      description: initialProductData[0].description,
      price: initialProductData[0].price,
      quantity: initialProductData[0].quantity,
      categoryId: initialProductData[0].category.id,
      images: [],
    };

    setTimeout(() => {
      setForm(initialProduct);
    }, 1000);
  };

  const updateProductData = async (productId) => {
    if (!productId.trim()) {
      return toast.warning("No product to cuddle with 😢");
    }

    try {
      setUpdating(true);
      await updateProduct(productId, form).then(() => {
        setTimeout(() => {
          toast.success("🦄 Update Product Success");
          onSuccess?.();
          setUpdating(false);

          // closes the dialog box
          setIsOpen(false);
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setUpdating(false);

      // Normal error
      const errMsg = error?.response?.data?.errors || "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 w-full h-full card bg-base-100 shadow-sm p-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="font-serif text-lg">Manage Products</h1>
              <p className="mb-2 text-sm opacity-50">
                Keep your product lineup looking fabulous — edit, update, or
                remove with ease! 🛍️✨
              </p>
            </div>
            {/* Pagination */}
            <div className="join mt-4 self-center">
              <button
                className={`join-item btn btn-sm`}
                onClick={() => {
                  setCurrentPage((prev) => {
                    const nextPage = prev > 1 ? prev - 1 : 1;
                    onSuccess?.(nextPage);
                    return nextPage;
                  });
                }}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>

              {totalPages <= 2
                ? Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`join-item btn btn-sm ${
                          currentPage === page ? "btn-neutral" : ""
                        }`}
                        onClick={() => {
                          setCurrentPage(page);
                          onSuccess?.(page);
                        }}
                      >
                        {page}
                      </button>
                    )
                  )
                : [
                    currentPage === totalPages ? 1 : currentPage,
                    "...",
                    totalPages,
                  ].map((page) => (
                    <button
                      key={page}
                      className={`join-item btn btn-sm ${
                        currentPage === page ? "btn-neutral" : ""
                      }`}
                      onClick={() => {
                        setCurrentPage(page);
                        onSuccess?.(page);
                      }}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}

              <button
                className={`join-item btn btn-sm`}
                onClick={() => {
                  setCurrentPage((prev) => {
                    const nextPage = prev < totalPages ? prev + 1 : totalPages;
                    onSuccess?.(nextPage);
                    return nextPage;
                  });
                }}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="max-h-[250px] overflow-auto">
            {loading ? (
              <div className="flex justify-center w-full h-[150px]">
                <span className="loading loading-spinner text-secondary"></span>
              </div>
            ) : (
              <table className="table table-zebra">
                <thead className="sticky top-0 z-[1] bg-base-200">
                  <tr>
                    <th>
                      <div className="flex gap-2 items-center">
                        <Boxes
                          size={18}
                          opacity={0.5}
                          className="text-primary"
                        />
                        Category
                      </div>
                    </th>
                    <th>
                      <div className="flex gap-2 items-center">
                        <Sparkle
                          size={18}
                          opacity={0.5}
                          className="text-accent"
                        />
                        Name
                      </div>
                    </th>
                    <th>
                      <div className="flex gap-2 items-center">
                        <Sparkle
                          size={18}
                          opacity={0.5}
                          className="text-secondary"
                        />
                        Description
                      </div>
                    </th>
                    <th>
                      <div className="flex gap-2 items-center">
                        <CoinsIcon
                          size={18}
                          opacity={0.5}
                          className="text-primary"
                        />
                        Price
                      </div>
                    </th>
                    <th>
                      <div className="flex gap-2 items-center">
                        <BoxIcon
                          size={18}
                          opacity={0.5}
                          className="text-accent"
                        />
                        Quantity
                      </div>
                    </th>
                    <th className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <PencilLine
                          size={18}
                          opacity={0.5}
                          className="text-secondary"
                        />
                        Updated
                      </div>
                    </th>
                    <th>
                      <div className="flex gap-2 items-center justify-center">
                        <Sticker
                          size={18}
                          opacity={0.5}
                          className="text-primary"
                        />
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product?.map((item, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-1000 ${
                        item.id === lastAddedId
                          ? "bg-secondary/25"
                          : item.id === removingId
                          ? "animate-blink opacity-50"
                          : ""
                      }`}
                    >
                      <td>{item.category.name}</td>
                      <td>{item.title}</td>
                      <td>{item.description.slice(0, 20) + "..."}</td>
                      <td className="text-center">
                        <span>{item.price.toLocaleString()}</span>
                        <span className="opacity-50"> ฿</span>
                      </td>
                      <td className="text-center">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td>
                        <span className="badge badge-soft badge-secondary badge-sm">
                          {new Date(item?.updatedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <th className="flex gap-2">
                        {/* update button */}

                        <button
                          className="btn btn-accent btn-dash btn-xs"
                          onClick={() => {
                            setIsOpen(true);
                            handleSetInitialValueForProduct(item.id);
                          }}
                        >
                          <Settings2 size={16} opacity={0.5} />
                          Update
                        </button>

                        {/* delete button */}
                        <button
                          className="btn btn-primary btn-dash btn-xs"
                          onClick={() => removeProductData(item.id)}
                          disabled={item.id === removingId}
                        >
                          <Trash size={16} opacity={0.5} />
                          {item.id === removingId ? "Removing" : "Remove"}
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Update Product Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Product"
      >
        <p className="opacity-50">Update the product here 🛒💖</p>

        {form ? (
          <div className="flex flex-col gap-4 max-w-md w-full z-1 mt-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-start justify-between">
                <p className="tooltip" data-tip="3 to 50 characters">
                  title
                </p>
                <div className="flex flex-col w-[320px] items-end justify-end">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={(e) => handleOnchange(e)}
                    placeholder="title"
                    className="input input-secondary validator"
                    minLength="3"
                    maxLength="50"
                    required
                  />
                  <p className="validator-hint hidden w-full">
                    Must be 3 to 50 characters
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-start justify-between">
              <p className="tooltip" data-tip="3 to 100 characters">
                description
              </p>
              <div className="flex flex-col w-[320px] items-end justify-end">
                <textarea
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={(e) => handleOnchange(e)}
                  placeholder="description"
                  className="textarea textarea-secondary validator"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="100"
                  required
                />
                <p className="validator-hint hidden w-full">
                  Must be 3 to 100 characters
                  <br />
                  containing only letters, numbers or dash
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-start justify-between">
              <p className="tooltip" data-tip="up to 5,000THB">
                price
              </p>

              <div className="flex gap-2 justify-center items-center w-full max-w-[320px]">
                <input
                  type="range"
                  min={1}
                  max="5000"
                  name="price"
                  value={form.price}
                  onChange={(e) => handleOnchange(e)}
                  className="range range-secondary"
                />

                <input
                  type="number"
                  name="price"
                  value={
                    form.price > 5000 ? 5000 : form.price < 1 ? 1 : form.price
                  }
                  onChange={(e) => handleOnchange(e)}
                  placeholder="price"
                  className="input input-secondary w-[35%]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 items-start justify-between">
              <p className="tooltip" data-tip="up to 1,000">
                quantity
              </p>
              <div className="flex gap-2 justify-center items-center w-full max-w-[320px]">
                <input
                  type="range"
                  min={1}
                  max="1000"
                  name="quantity"
                  value={form.quantity}
                  onChange={(e) => handleOnchange(e)}
                  className="range range-secondary"
                />

                <input
                  type="number"
                  name="quantity"
                  value={
                    form.quantity > 1000
                      ? 1000
                      : form.quantity < 1
                      ? 1
                      : form.quantity
                  }
                  onChange={(e) => handleOnchange(e)}
                  placeholder="quantity"
                  className="input input-secondary w-[35%]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 items-start justify-between">
              <p>category</p>
              {!categories ? (
                <div className="flex justify-center w-full">
                  <span className="loading loading-spinner text-secondary"></span>
                </div>
              ) : (
                <select
                  className="select select-secondary"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={(e) => handleOnchange(e)}
                  required
                >
                  <option value="" disabled>
                    Please Select
                  </option>

                  {categories &&
                    categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-neutral to-secondary-content/25 rounded-xl text-white w-full ">
              <div>
                <h1 className="text-xl font-serif">Upload Images</h1>
                <p className="text-sm mb-2 opacity-80">
                  Add some lovely images here — make a product shine! ✨
                </p>
              </div>

              <div className="flex justify-center w-full">
                <input
                  type="file"
                  className="file-input file-input-secondary"
                />
              </div>
            </div>

            <div className="flex w-full justify-end">
              <button
                className="btn btn-secondary w-full"
                onClick={() => updateProductData(productId)}
              >
                {updating ? (
                  <div className="flex justify-center items-center gap-2 w-full py-4">
                    <span className="loading loading-spinner"></span>
                    <p>Updating...</p>
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2 w-full py-4">
            <span className="loading loading-spinner text-secondary"></span>
            <p className="text-secondary font-serif">Loading...</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Products;
