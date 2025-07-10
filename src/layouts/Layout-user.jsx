import { Outlet } from "react-router-dom";

const LayoutUser = () => {
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
