import CategoryList from "../../components/admin/CategoryList";
import FormCategory from "../../components/admin/FormCategory";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "../../api/category";
import { IMAGE_MAP, REST_IMAGE } from "../../utils/constant";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastAddedId, setLastAddedId] = useState(null);

  const fetchCategory = async () => {
    try {
      const res = await getCategory();
      const categoryData = res.data;

      const withImage = categoryData.map((item) => ({
        ...item,
        image:
          IMAGE_MAP[item.name] ||
          REST_IMAGE, // fallback เผื่อไม่มีรูป
      }));

      setCategories(withImage);
      // toast.success("Success loading");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (!lastAddedId) return;

    const resetLastAddedId = () => setLastAddedId(null);
    const timerId = setTimeout(resetLastAddedId, 3000);

    return () => clearTimeout(timerId);
  }, [lastAddedId]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-5xl">
      <div className="header flex flex-col gap-2">
        <h1 className="font-serif text-3xl">Category</h1>
        <p className="text-sm opacity-75">
          Let’s keep your dashboard neat and tidy — organize items with the
          perfect category! 🗂️✨
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-96">
        <div className="basis-2/3">
          <CategoryList
            category={categories}
            loading={loading}
            lastAddedId={lastAddedId}
            onSuccess={() => {
              fetchCategory();
              console.log("👋 Category removed!");
            }}
          />
        </div>
        <div className="basis-1/3">
          <FormCategory
            category={categories}
            setLastAddedId={setLastAddedId}
            onSuccess={() => {
              fetchCategory();
              console.log("👋 Category created!");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Category;
