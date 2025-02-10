import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";

import { ItemDetails } from "./pages/index";
import { ThemeProvider } from "./components/theme-provider";
import DataProvider from "./context/DataContext";
import SaleHistory from "./pages/SaleHistory";
import CustomerComplaint from "./pages/CustomerComplaint";
import SaleRecord from "./pages/SaleRecord";
import { TopSellingProduct } from "./pages/TopSellingProduct";
import { SalePerformance } from "./pages/SalePerformance";
import Sale from "./pages/Sale";
import Layout from "./pages/layout";
import Order from "./pages/orders/page";
import Delivery from "./pages/deliveries/page";
import Escalations from "./pages/escalations/page";
import Customer from "./pages/customers/page";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ItemDetails />,
    },
    {
      path: "/products",
      element: <ItemDetails />,
    },
    {
      path: "/:name/:id",
      element: <ProductDetail />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
    {
      path: "/history",
      element: <SaleHistory />,
    },
    {
      path: "/customer-complaint",
      element: <CustomerComplaint />,
    },
    {
      path: "/sales-record",
      element: <SaleRecord />,
    },
    {
      path: "/sales-dashboard",
      element: (
        <Layout>
          <Sale />
        </Layout>
      ),
    },
    {
      path: "/orders",
      element: (
        <Layout>
          <Order />
        </Layout>
      ),
    },
    {
      path: "/deliveries",
      element: (
        <Layout>
          <Delivery />
        </Layout>
      ),
    },
    {
      path: "/customers",
      element: (
        <Layout>
          <Customer />
        </Layout>
      ),
    },
    {
      path: "/escalations",
      element: (
        <Layout>
          <Escalations />
        </Layout>
      ),
    },
    {
      path: "/reports",
      element: <Layout></Layout>,
    },
    {
      path: "/settings",
      element: <Layout></Layout>,
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
