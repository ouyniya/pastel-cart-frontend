import { Outlet } from "react-router-dom";
import MainNav from "../components/Main-nav";

const Layout = () => {

  return (
    <div>
      <MainNav />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
export default Layout;
