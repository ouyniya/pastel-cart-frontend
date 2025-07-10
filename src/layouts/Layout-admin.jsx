import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
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
export default LayoutAdmin;
