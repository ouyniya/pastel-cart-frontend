import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import NavbarNotification from "./NavbarNotification";
import NavbarProfile from "./NavbarProfile";
import Logo from "../Logo";

const NavbarAdmin = ({ setShowSidebar }) => {
  return (
    <nav>
      <div className="flex justify-between mx-auto h-16 px-4">
        <div className="flex items-center gap-4">
          <div className="flex-none hidden md:block">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => setShowSidebar((prev) => !prev)}
            >
              <Menu size={20} />
            </button>
          </div>
          <Link to={"/"}>
            <Logo />
          </Link>
          <Link to={"/"}>Home</Link>
        </div>

        <div className="flex items-center gap-4">
          {/* notification */}
          <NavbarNotification />

          {/* profile menu */}
          <NavbarProfile />
        </div>
      </div>
    </nav>
  );
};
export default NavbarAdmin;
