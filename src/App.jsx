import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { ItemDetails } from "./pages/index";
import DataProvider from "./context/DataContext";
import { ThemeProvider } from "./components/theme-provider";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SaleHistory from "./pages/SaleHistory";
import SaleRecord from "./pages/SaleRecord";
import Sale from "./pages/Sale";
import SaleLayout from "./pages/layout";
import WarehouseLayout from "./pages/Warehouse/Layout";
import Order from "./pages/orders/page";
import Delivery from "./pages/deliveries/page";
import Escalations from "./pages/escalations/page";
import Customer from "./pages/customers/page";
import { Truck } from "./pages/Truck";
import DeliveryDetail from "./pages/deliveries/deliveryDetail";
import { element } from "prop-types";
import { useSelector } from "react-redux";
import ComplaintsPage from "./pages/complaints/Page";
import Page from "./pages/Warehouse/Page";
import Orders from "./pages/Warehouse/orders/page";
import Complaints from "./pages/Warehouse/complaints/page";
import StockManagement from "./pages/Warehouse/stock/page";
import Returns from "./pages/Warehouse/returns/page";
import TruckManagement from "./pages/Warehouse/trucks/page";
import Settings from "./pages/Warehouse/settings/page";
import Products from "./components/Warehouse/products/Products";

const App = () => {
  console.log(useSelector((state)=>state.user.currentUser));
  
  const PrivateRoute = ({element,allowedRoles = []}) => {
    const currentUser = useSelector((state)=>state.user.currentUser);
    if(!currentUser) return  <Navigate to="/login" />;
    if(!allowedRoles.includes(currentUser.role)) return <Navigate to="/" />
    return element;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ItemDetails />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/:name/:id",
      element: <ProductDetail />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/checkout",
      element: <PrivateRoute element={<CheckoutPage />}/>,
    },
    {
      path: "/history",
      element: <PrivateRoute element={<SaleHistory />}/>,
    },
   
    {
      path: "/sales-record",
      element: <PrivateRoute element={<SaleRecord />}/>,
    },
    {
      path: "/sales-dashboard",
      element: <PrivateRoute element={
        <Layout>
          <Sale />
        </Layout>
      }/>,
    },
    {
      path: "/orders",
      element: <PrivateRoute element={
        <Layout>
          <Order />
        </Layout>
      }/>,
    },
    {
      path: "/deliveries",
      element: <PrivateRoute element={
        <Layout>
          <Delivery />
        </Layout>
      }/>,
    },
    {
      path: "/deliveries/detail/:truckId",
      element: <PrivateRoute element={<Layout>
        <DeliveryDetail />
      </Layout>}/>,
    },
    {
      path: "/customers",
      element: <PrivateRoute element={<Layout>
        <Customer />
      </Layout>}/>,
    },
    {
      path: "/escalations",
      element: <PrivateRoute element={<Layout>
        <Escalations />
      </Layout>}/>,
    },
    {
      path: "/reports",
      element: <PrivateRoute element={<Layout></Layout>}/>,
    },
    {
      path: "/settings",
      element: <PrivateRoute element={<Layout></Layout>}/>,
    },
    {
      path: "/test",
      element: <PrivateRoute element={<Layout></Layout>}/>,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />;
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
