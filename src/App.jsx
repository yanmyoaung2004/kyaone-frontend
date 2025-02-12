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

import DriversPage from "./pages/drivers/page";
import EditDriverPage from "./components/drivers/components/EditDriverPage"
import NewDriverPage from "./components/drivers/components/NewDriverPage";
import DriverPage from "./components/drivers/components/DriverPage"

import Page from "./pages/warehouse/page";
import WarehouseLayout from "./pages/warehouse/layout";
import Orders from "./pages/Warehouse/orders/page";
import Complaints from "./pages/warehouse/complaints/page";
import StockManagement from "./pages/Warehouse/stock/page";
import Returns from "./pages/Warehouse/returns/page";
import TruckManagement from "./pages/Warehouse/trucks/page";
import Settings from "./pages/Warehouse/settings/page"; 
import LoginPage from "./pages/Login";
import Dashboard_login from "./pages/Dashboard_login";
import { DriverLoginForm } from "./components/driverLogin";
// import Products from "./components/warehouse/products/Products";

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
      path : "/login",
      element : <LoginPage />
    },
    {
      path : "/register",
      element : <Register />
    },
    {
      path : "/Dashboard_login",
      element : <Dashboard_login />
    },
    {
      path : "/Driver_login",
      element : <DriverLoginForm />
    },
    {
      path : "/LowStock",
      element : <LowStock />
    },
    {
      path : "/drivers",
      element : <DriversPage />
    },
    {
      path: "/drivers/new",
      element: <NewDriverPage />   
    },
    {
      path: "/drivers/:id/edit",
      element: <EditDriverPage />   
    },
    {
      path: "/drivers/:id/",
      element: <DriverPage />   
    },
    {
      path: "/warehouse-dashboard",
      element: (
      <WarehouseLayout>
        <Page />
      </WarehouseLayout>
      ),
    },
    {
      path: "/warehouse-orders",
      element: (
      <WarehouseLayout>
        <Orders />
      </WarehouseLayout>
    ),
    },
    {
      path: "/warehouse-complaints",
      element: (
      <WarehouseLayout>
        <Complaints />
      </WarehouseLayout>
      ),
    },
    {
      path: "/warehouse-stock",
      element: (
      <WarehouseLayout>
        <StockManagement />
      </WarehouseLayout>
      ),
    },
    // {
    //   path: "/product-management",
    //   element: (
    //   <WarehouseLayout>
    //     <Products />
    //   </WarehouseLayout>
    //   ),
    // },
    {
      path: "/warehouse-returns",
      element: (
      <WarehouseLayout>
        <Returns />
      </WarehouseLayout>
      ),
    },
    {
      path: "/warehouse-trucks",
      element: (
      <WarehouseLayout>
        <TruckManagement />
      </WarehouseLayout>
      ),
    },
    {
      path: "/warehouse-setting",
      element: <WarehouseLayout><Settings /></WarehouseLayout>,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
