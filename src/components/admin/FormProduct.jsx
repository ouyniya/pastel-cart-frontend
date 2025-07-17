import { useState } from "react";
import { toast } from "react-toastify";
import { INITIAL_STATE } from "../../utils/constant";
import { addProduct } from "../../api/product";
import ProductAddingManual from "./ProductAddingManual";

const FormProduct = ({ onSuccess, setLastAddedId, product, categories }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(null);
  const [error, setError] = useState("");

  const existingProduct = product;

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      if (name === "price" || name === "quantity") {
        return { ...prev, [name]: +value };
      }
      return { ...prev, [name]: value };
    });
    setError("");
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    for (const key in form) {
      const item = form[key];
      if (typeof item === "string") {
        if (item.trim().length === 0) {
          return toast.warning(
            `Oops! Field ${key} is empty. Please fill it in 🙏`
          );
        }
      }
    }

    try {
      setLoading(true);

      const res = await addProduct(form);

      toast.success("🦄 Create New Product Success");
      setLoading(false);

      onSuccess?.();
      setLastAddedId?.(res.data.id);
    } catch (error) {
      console.log(error);
      setLoading(false);

      const errMsg = error?.response?.data?.errors || "Something went wrong";
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setForm(INITIAL_STATE);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 w-full h-full card bg-base-100 shadow-sm p-6">
        <div className="flex flex-col gap-2 basis-2/3">
          <div>
            <h1 className="font-serif text-lg">Add New Product</h1>
            <p className="mb-2 text-sm opacity-50">
              Add your next best-seller right here 🛒💖
            </p>
          </div>

          <div>
            <p className="text-xs text-secondary-content/25">{error}</p>
          </div>

          <form className="flex flex-col gap-4 max-w-md w-full z-1">
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
                    form.price > 5000
                      ? 5000
                      : form.price < 1
                      ? 1
                      : form.price
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
              {fetchLoading ? (
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

            <button
              type="submit"
              onClick={(e) => handleCreateProduct(e)}
              className="btn btn-secondary max-w-max z-0"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </form>
        </div>

        <ProductAddingManual />
      </div>
    </>
  );
};
export default FormProduct;
