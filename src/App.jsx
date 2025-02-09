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
      element: <SaleRecord />
    }
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
