import WomanCom from "../../components/svg/WomanCom";

const ProductAddingManual = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-base-200 rounded-xl w-full lg:max-w-[45%]">
          {/* FAQ Header */}
          <div>
            <h1 className="text-xl font-serif">Let's Add a Product!</h1>
            <p className="text-sm mb-2 opacity-80">
              Follow these easy-peasy steps to add your adorable new item to the
              shop
            </p>
          </div>

          <WomanCom className="h-[210px]" />

          <div className="join join-vertical bg-base-100 rounded-4xl">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="product-manual" defaultChecked />
              <div className="collapse-title font-semibold">
                Step 1: Fill Out Product Details
              </div>
              <div className="collapse-content text-sm">
                Add the product title, description, price, category, and so
                on... Make it shine ✨!
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="product-manual" />
              <div className="collapse-title font-semibold">
                Step 2: Upload Cute Photos
              </div>
              <div className="collapse-content text-sm">
                Upload 1–5 high-quality images of your product. Show off those
                angles! 📸
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="product-manual" />
              <div className="collapse-title font-semibold">
                Step 3: Review and Submit
              </div>
              <div className="collapse-content text-sm">
                Double-check everything looks perfect ✅, then hit that "Add
                Product" button!
              </div>
            </div>
          </div>
        </div>
  )
}
export default ProductAddingManual