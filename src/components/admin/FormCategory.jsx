import { useState } from "react";
import { toast } from "react-toastify";
import { addCategory } from "../../api/category";
import WomanStar from "../../components/svg/WomanStar";

const FormCategory = ({ onSuccess, setLastAddedId, category }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const existingCategories = category;

  const handleOnchange = (e) => {
    const value = e.target.value;
    setName(value);
    setError("");

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    if (Array.isArray(existingCategories) && value.trim()) {
      const filtered = existingCategories.filter((cat) =>
        cat.name.toLowerCase().includes(value.trim().toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]); // clear เมื่อว่างหรือไม่มี match
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length > 30) {
      return toast.warning(
        "Your category’s feeling a bit lost 😢 Give it a proper name!"
      );
    }

    if (
      existingCategories.some(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.warning("🍩 Oops! Category already exists.");
    }

    const form = {
      name: name,
    };

    try {
      setLoading(true);

      const res = await addCategory(form);

      toast.success("🦄 Create New Category Success");
      setLoading(false);

      onSuccess?.();
      setLastAddedId?.(res.data.id);
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
        setError(errMsg);
        return;
      }

      // Normal error
      const errMsg = error?.response?.data?.errors || "Something went wrong";
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setName("");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center lg:justify-start lg:items-start card bg-base-100 shadow-sm p-4">
        <h1 className="font-serif text-lg">Add New Category</h1>

        <p className="mb-2 block lg:hidden text-sm text-center opacity-50">
          Give this category a clear name — it’ll help organize products and
          make them easier to find later. 🎀
        </p>

        <div className="lg:flex flex-col gap-0 w-full h-[200px] p-4 bg-gradient-to-br from-neutral to-secondary-content/25 rounded-xl text-white hidden relative">
          <p className="text-sm mb-2">
            Give this category a clear name — it’ll help organize products and
            make them easier to find later.
          </p>
          <p className="absolute top-24 left-6 -rotate-12">🍪</p>
          <p className="absolute top-30 left-15 -rotate-12">🍰</p>
          <p className="absolute top-20 right-15 rotate-45">🥞 ۪</p>
          <p className="absolute top-30 right-8 rotate-30">🧁</p>
          <p className="absolute top-25 right-20 rotate-45 animate-pulse">
            ⋆˙⟡
          </p>
          <p className="absolute top-20 left-20 rotate-0 animate-pulse">⋆˙⟡</p>
          <p className="absolute top-40 right-15 rotate-0">⋆˙</p>
          <p className="absolute top-35 left-10 rotate-45">˙</p>
          <p className="absolute top-40 left-18 rotate-45 animate-pulse">⟡</p>
          <p className="absolute top-38 left-20 rotate-0">˙</p>
          <WomanStar className="absolute -bottom-1 left-[50%] -translate-x-[35%] h-[130px]" />
        </div>

        <div>
          <p className="text-xs text-secondary-content/25">{error}</p>
        </div>

        <div className="relative flex justify-center w-full z-1 mx-auto">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleOnchange(e)}
            placeholder="name"
            className="input input-secondary"
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-10 lg:left-0 dropdown rounded-box p-2 shadow-sm mt-1 w-full max-w-[320px] max-h-40 overflow-y-auto bg-secondary/20 backdrop-blur-xs text-secondary-content/40">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => {
                    setName(suggestion.name);
                    setSuggestions([]); // clear หลังเลือก
                  }}
                  className="cursor-pointer px-2 py-1 rounded"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          onClick={(e) => handleCreateCategory(e)}
          className="btn btn-soft btn-secondary max-w-max lg:ml-auto z-0"
        >
          {loading ? "Loading..." : "Add Category"}
        </button>
      </div>
    </>
  );
};
export default FormCategory;
