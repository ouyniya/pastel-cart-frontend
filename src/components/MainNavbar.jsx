import { Link, Navigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import useEcommerceStore from "../stores/ecommerceStore";
import { toast } from "react-toastify";
import Logo from "./Logo";

const MainNav = () => {
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
    <nav>
      <div className="flex justify-between mx-auto h-16 px-4 bg-base-200">
        <div className="flex items-center gap-4">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>{" "}
              </svg>
            </button>
          </div>
          <Link to={"/"}>
          <Logo />
          </Link>
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/cart"}>Cart</Link>
        </div>

        {!user ? (
          <div className="flex items-center gap-4">
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* <Link to="" onClick={() => handleLogout()}>
              Logout
            </Link> */}
            <Link to={`/${user.role.toLowerCase()}`}>Dashboard</Link>
            <Link to="#" onClick={() => handleLogout()}>
              Logout
            </Link>
            <ThemeToggle />
          </div>
        )}
      </div>
    </nav>
  );
};
export default MainNav;
