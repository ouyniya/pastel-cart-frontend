import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import HomeUser from "../pages/user/Home-user";

import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/Layout-admin";
import LayoutUser from "../layouts/Layout-user";
import ProtectRouteUser from "./Protect-route-user";
import SoftProtectRoute from "./Soft-protect-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/history", element: <History /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
  {
    path: "/",
    element: <SoftProtectRoute element={<Layout />} />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteUser element={<LayoutAdmin role={"ADMIN"} />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser role={"USER"} />} />,
    children: [{ index: true, element: <HomeUser /> }],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default AppRoutes;
