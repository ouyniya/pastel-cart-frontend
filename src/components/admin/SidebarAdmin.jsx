import { Box, GroupIcon, Home, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sidebarItems = [
  { icon: <Home size={20} />, label: "Overview", link: "#" },
  { icon: <User2 size={20} />, label: "Users", link: "#" },
  { icon: <Box size={20} />, label: "Products", link: "#" },
  { icon: <GroupIcon size={20} />, label: "Categories", link: "#" },
];

const SidebarAdmin = () => {
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0, ease: "easeOut" }}
      className="w-full py-12 px-4"
    >
      <ul className="flex flex-col rounded-box gap-2 w-80 bg-neutral shadow-sm text-base-100 py-4">
        {sidebarItems.map((item, i) => (
          <motion.li
            key={i}
            whileHover={{
              scale: 1.03,
              backgroundColor: "var(--tw-prose-bold)",
              borderRadius: "999px",
            }}
            transition={{ type: "spring", stiffness: 100 }}
            className="group cursor-pointer transition-all duration-0"
          >
            <Link
              to={item.link}
              className="flex items-center gap-3 text-base-100 hover:text-white px-4 py-3 hover:bg-neutral-content/10 rounded-none"
            >
              <motion.span
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-secondary"
              >
                {item.icon}
              </motion.span>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SidebarAdmin;
