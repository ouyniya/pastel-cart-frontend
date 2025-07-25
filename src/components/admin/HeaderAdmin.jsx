import { Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";

const HeaderAdmin = () => {
  return (
    <motion.div
      initial={{ rotate: 1, scale: 1.1 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className="w-full shadow-sm rounded-xl px-6 py-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-secondary text-base relative overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-base-100/20 backdrop-blur-3xl rounded-xl z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between w-full">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Title and Greeting */}
            <div className="flex gap-2 items-center font-semibold">
              <p>Service status: Authentication...</p>
              <button className="btn btn-xs btn-dash">Success</button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 w-full md:w-auto">
            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="btn btn-xs lg:btn-sm btn-neutral">
                <Plus className="w-4 h-4 mr-1" />
                New User
              </button>
              <button className="btn btn-xs lg:btn-sm btn-outline btn-neutral">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export default HeaderAdmin;
