import { Link, Navigate } from "react-router-dom";
import useEcommerceStore from "../../stores/ecommerce-store";
import { toast } from "react-toastify";

const NavbarProfile = () => {
  const actionLogout = useEcommerceStore((state) => state.actionLogout);
  const user = useEcommerceStore((state) => state.user);

  const handleLogout = () => {
    if (user) {
      actionLogout();
      toast("You've been signed out — we miss you already! 🥺💬");
      return <Navigate to={"/"} />;
    }

    return null;
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://picsum.photos/id/501/200/200"
            loading="lazy"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to="#" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="#">Settings</Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleLogout()} className="text-secondary-content/40">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavbarProfile;
