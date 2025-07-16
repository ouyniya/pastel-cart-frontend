import { useEffect, useState } from "react";
import useEcommerceStore from "../stores/ecommerceStore";
import { currentUser } from "../api/auth";
import LoadingRedirect from "./Loading-redirect";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectRouteUser = ({ element }) => {
  const navigate = useNavigate();
  const [permit, setPermit] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(null);

  const user = useEcommerceStore((state) => state.user);
  const token = useEcommerceStore((state) => state.token);
  const actionLogout = useEcommerceStore((state) => state.actionLogout);

  useEffect(() => {
    setLoading(true);
    if (user && token) {
      setTimeout(() => {
        currentUser()
          .then((data) => {
            const getRole = data?.data?.user?.role;
            setRole(getRole);
            setPermit(true);
            // console.log("current user", data)
          })
          .catch((error) => {
            setPermit(false);
            setRole("GUEST");
            
            const errMsg = error?.response?.data?.errors;
            console.log(error)

            // token expired or wrong token
            if (errMsg === "jwt expired") {
              actionLogout();
              toast(
                "Oops! Your token took a nap 😴 Please log in again to wake things up! 💖"
              );
              navigate("/login");
            }
          })
          .finally(() => setLoading(false));
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  return permit && role !== null ? (
    element
  ) : loading ? (
    <div>loading...</div>
  ) : (
    <LoadingRedirect />
  );
};

export default ProtectRouteUser;
