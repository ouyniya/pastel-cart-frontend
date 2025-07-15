import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNavbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div
        className="min-h-[100dvh] grid antialiased
        gap-8
        "
        style={{
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
      <MainNav />
      <main className="max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
