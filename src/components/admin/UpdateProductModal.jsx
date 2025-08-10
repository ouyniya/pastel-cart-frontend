import Modal from "../Modal";

const UpdateProductModal = ({
  isOpen,
  onClose,
  form,
  handleOnchange,
  updateProductData,
  updating,
  categories,
  productId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Product">
      <p className="opacity-50">Update the product here 🛒💖</p>

      {!form ? (
        <div className="flex justify-center items-center gap-2 w-full py-4">
          <span className="loading loading-spinner text-secondary"></span>
          <p className="text-secondary font-serif">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-md w-full z-1 mt-6">
          {/* title */}
          <div className="flex gap-2 items-start justify-between">
            <p className="tooltip" data-tip="3 to 50 characters">
              title
            </p>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleOnchange}
              className="input input-secondary"
            />
          </div>

          {/* description */}
          <div className="flex gap-2 items-start justify-between">
            <p className="tooltip" data-tip="3 to 100 characters">
              description
            </p>
            <textarea
              name="description"
              value={form.description}
              onChange={handleOnchange}
              className="textarea textarea-secondary"
            />
          </div>

          {/* price */}
          <div className="flex gap-2 items-start justify-between">
            <p className="tooltip" data-tip="up to 5,000THB">
              price
            </p>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleOnchange}
              className="input input-secondary"
            />
          </div>

          {/* quantity */}
          <div className="flex gap-2 items-start justify-between">
            <p>quantity</p>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleOnchange}
              className="input input-secondary"
            />
          </div>

          {/* category */}
          <div className="flex gap-2 items-start justify-between">
            <p>category</p>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleOnchange}
              className="select select-secondary"
            >
              <option value="">Please Select</option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            className="btn btn-secondary w-full"
            onClick={() => updateProductData(productId)}
          >
            {updating ? <span className="loading loading-spinner" /> : "Update"}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default UpdateProductModal;
