import { Navigate } from "react-router-dom";
import useEcommerceStore from "../stores/ecommerceStore";

const SoftProtectRoute = ({ element }) => {
  const user = useEcommerceStore((state) => state.user);
  console.log(user);

  return user?.role ? (
    <Navigate to={"/"} />
  ) : user === null ? (
    element
  ) : (
    <Navigate to={"/"} />
  );
};
export default SoftProtectRoute;
