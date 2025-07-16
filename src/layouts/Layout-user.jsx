import { Navigate, Outlet } from "react-router-dom";
import useEcommerceStore from "../stores/ecommerceStore";

const LayoutUser = ({ role }) => {
  const user = useEcommerceStore((state) => state.user);

  if (role !== user?.role) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <nav></nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
export default LayoutUser;
