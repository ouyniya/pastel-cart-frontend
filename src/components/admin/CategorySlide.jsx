import { motion } from "framer-motion";

const CategorySlide = ({ category }) => {
  if (!category || category.length === 0) return null;

  const repeated = [...category, ...category];

  return (
    <div className="card w-full">
      <div className="relative overflow-hidden w-full py-4">
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }} // เลื่อนไปครึ่งหนึ่งของ 2 ชุด
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {!category ? (
            <div className="flex justify-center w-full">
              <span className="loading loading-spinner text-secondary"></span>
            </div>
          ) : (
            repeated.map((item, index) => (
              <div key={index} className="relative bg-secondary rounded-xl">
                <img
                  src={item.image}
                  alt={`img-${index}`}
                  className="w-20 h-20 rounded-xl shadow-sm object-cover object-center opacity-75"
                />
                <div className="absolute bottom-3 right-0 w-full bg-base-100/30 backdrop-blur-lg shadow-sm">
                  <p className="text-xs text-right pr-2">{item?.name}</p>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default CategorySlide;
