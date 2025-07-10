import { Outlet } from "react-router-dom";

const Layout = () => {
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
export default Layout;
