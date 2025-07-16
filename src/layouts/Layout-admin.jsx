import { Navigate, Outlet } from "react-router-dom";
import useEcommerceStore from "../stores/ecommerceStore";
import NavbarAdmin from "../components/admin/NavbarAdmin";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import FooterAdmin from "../components/admin/FooterAdmin";

const LayoutAdmin = ({ role }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setShowSidebar(true);
  }, []);

  const user = useEcommerceStore((state) => state.user);

  if (role !== user?.role) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="min-h-[100dvh] grid antialiased bg-gradient-to-br from-neutral/15 to-secondary text-slate-500"
      style={{
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "minmax(0, 1fr)",
      }}
    >
      {/* Top Navbar */}
      <motion.div layout className="w-full">
        <NavbarAdmin setShowSidebar={setShowSidebar} />
      </motion.div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div
          animate={{ width: showSidebar ? 250 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, velocity: -100 }}
          className="overflow-hidden md:block hidden"
        >
          {showSidebar && <SidebarAdmin />}
        </motion.div>

        {/* Content */}
        <motion.div
          animate={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 18, velocity: -100  }}
          className="px-8 py-8 mt-4 overflow-auto !w-full md:w-full bg-base-100/50 backdrop-blur-md rounded-l-4xl shadow-sm"
        >
          <Outlet />
        </motion.div>
      </div>

      <FooterAdmin />
       </div>
  );
};
export default LayoutAdmin;
