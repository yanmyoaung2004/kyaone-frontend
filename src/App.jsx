import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from './pages/ProductDetail'
import CheckoutPage from './pages/CheckoutPage'
import { LowStock } from "./pages/LowStock";


import { ItemDetails } from "./pages/index";
import TableComponent from "./components/Cards/TableComponent";
import { ThemeProvider } from "./components/theme-provider";
import DataProvider from "./context/DataContext";
import { TopRegion } from "./pages/TopRegion";
import { Profit } from "./pages/Profit";

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
      element: <TableComponent />,
    },
    {
      path : "/topRegion",
      element : <TopRegion />
    },
    {
      path : "/Profit",
      element : <Profit />
    },
    {
      path : "/LowStock",
      element : <LowStock />
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
