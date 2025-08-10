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

const ProductTable = ({
  product = [],
  loading,
  lastUpdatedId,
  lastAddedId,
  removingId,
  setIsOpen,
  handleSetInitialValueForProduct,
  removeProductData,
}) => {
  return (
    <table className="table table-zebra">
      <thead className="sticky top-0 z-[1] bg-base-200">
        <tr>
          <th>
            <div className="flex gap-2 items-center">
              <Boxes size={18} className="text-primary" /> Category
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center">
              <Sparkle size={18} className="text-accent" /> Name
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center">
              <Sparkle size={18} className="text-secondary" /> Description
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center">
              <CoinsIcon size={18} className="text-primary" /> Price
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center">
              <BoxIcon size={18} className="text-accent" /> Quantity
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center">
              <PencilLine size={18} className="text-secondary" /> Updated
            </div>
          </th>
          <th>
            <div className="flex gap-2 items-center justify-center">
              <Sticker size={18} className="text-primary" /> Action
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? "loading..."
          : product?.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-1000 ${
                  item.id === lastAddedId || item.id === lastUpdatedId
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
                  {item.price.toLocaleString()}{" "}
                  <span className="opacity-50">฿</span>
                </td>
                <td className="text-center">
                  {item.quantity.toLocaleString()}
                </td>
                <td>
                  <span className="badge badge-soft badge-secondary badge-sm">
                    {new Date(item?.updatedAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-accent btn-dash btn-xs"
                    onClick={() => {
                      setIsOpen(true);
                      handleSetInitialValueForProduct(item.id);
                    }}
                  >
                    <Settings2 size={16} /> Update
                  </button>
                  <button
                    className="btn btn-primary btn-dash btn-xs"
                    onClick={() => removeProductData(item.id)}
                    disabled={item.id === removingId}
                  >
                    <Trash size={16} />{" "}
                    {item.id === removingId ? "Removing" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
