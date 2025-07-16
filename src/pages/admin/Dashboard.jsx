import { useEffect, useState } from "react";
import { currentUser } from "../../api/auth";
import { toast } from "react-toastify";

import ContentStat from "../../components/admin/ContentStat";
import ContentWelcome from "../../components/admin/ContentWelcome";
import ContentEarning from "../../components/admin/ContentEarning";
import HeaderAdmin from "../../components/admin/HeaderAdmin";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      currentUser()
        .then((data) => {
          setUser(data?.data?.user);
        })
        .catch((error) => {
          const errMsg = error?.response?.data?.errors;
          toast(errMsg || "Some thing went wrong");
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:gap-4 gap-4 max-w-5xl">

        <div className="flex justify-between items-center">
        {loading ? "loading..." : <ContentWelcome user={user} />}
          <p className="text-sm mt-2 opacity-70 text-right">
            Let’s manage your system effectively today.
          </p>
        </div>

        <HeaderAdmin />
        <ContentStat />
        <ContentEarning />
      </div>
    </>
  );
};
export default Dashboard;
