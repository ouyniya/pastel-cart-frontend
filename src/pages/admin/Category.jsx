import CategoryList from "../../components/admin/CategoryList";
import FormCategory from "../../components/admin/FormCategory";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "../../api/category";

const imageMap = {
  Pudding:
    "https://images.unsplash.com/flagged/photo-1565192835791-7b3069d9eea4?q=80&w=894&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Cookie:
    "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Cake: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Mochi:
    "https://images.unsplash.com/photo-1724052526175-4a7332bd10e9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Chocolate:
    "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Jelly:
    "https://images.unsplash.com/photo-1605125208383-694750af8f5b?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Ice Cream":
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Donut:
    "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Sweet:
    "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Thai Dessert":
    "https://images.unsplash.com/photo-1738573519644-93b700f3adf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

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
          imageMap[item.name] ||
          "https://images.unsplash.com/photo-1738573519644-93b700f3adf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // fallback เผื่อไม่มีรูป
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
