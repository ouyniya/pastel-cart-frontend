import { useState } from "react";
import { PencilLine, Sparkle, Sticker, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { removeCategory } from "../../api/category";

const CategoryList = ({ onSuccess, category, loading, lastAddedId }) => {
  const [removingId, setRemovingId] = useState(null);

  const removeCategoryData = async (categoryId) => {
    if (!categoryId.trim()) {
      return toast.warning("No categories to cuddle with 😢");
    }

    setRemovingId(categoryId); // set id ที่กำลังลบ

    try {
      await removeCategory(categoryId).then(() => {
        toast.success("🦄 Remove Category Success");
        setTimeout(() => {
          onSuccess?.();
          setRemovingId(null); // clear id ที่ลบหลังโหลดใหม่
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setRemovingId(null);

      // Normal error
      const errMsg = error?.response?.data?.errors || "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="card w-full h-96 bg-base-100 shadow-sm p-4">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">

              <span className="loading loading-spinner text-secondary"></span>

            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th></th>
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
                    <div className="flex gap-2 items-center">
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
                {category.map((item, index) => (
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
                    <td>
                      <div className="flex items-center justify-center h-full gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt={`Avatar of ${item.name}`}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <span className="badge badge-soft badge-secondary badge-sm">
                        {new Date(item?.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <th>
                      <button
                        className="btn btn-primary btn-dash btn-xs"
                        onClick={() => removeCategoryData(item.id)}
                        disabled={item.id === removingId}
                      >
                        <Trash
                          size={16}
                          opacity={0.5}
                        />
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
    </>
  );
};
export default CategoryList;
