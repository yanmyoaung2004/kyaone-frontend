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
import Sale from "./pages/Sale";
import SaleLayout from "./pages/layout";
import WarehouseLayout from "./pages/Warehouse/Layout";
import Order from "./pages/orders/page";
import Delivery from "./pages/deliveries/page";
import Escalations from "./pages/escalations/page";
import Customer from "./pages/customers/page";
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
        <SaleLayout>
          <Sale />
        </SaleLayout>
      ),
    },
    {
      path: "/sales-orders",
      element: (
        <SaleLayout>
          <Order />
        </SaleLayout>
      ),
    },
    {
      path: "/sales-deliveries",
      element: (
        <SaleLayout>
          <Delivery />
        </SaleLayout>
      ),
    },
    {
      path: "/sales-customers",
      element: (
        <SaleLayout>
          <Customer />
        </SaleLayout>
      ),
    },
    {
      path: "/sales-escalations",
      element: (
        <SaleLayout>
          <Escalations />
        </SaleLayout>
      ),
    },
    {
      path: "/sales-reports",
      element: <SaleLayout></SaleLayout>,
    },
    {
      path: "/sales-settings",
      element: <SaleLayout></SaleLayout>,
    },
    {
      path: "/sales-complaints",
      element: (
        <SaleLayout>
          <ComplaintsPage />
        </SaleLayout>
      ),
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
    {
      path: "/product-management",
      element: (
        <WarehouseLayout>
          <Products />
        </WarehouseLayout>
      ),
    },
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
      element: <WarehouseLayout>{/* <Settings /> */}</WarehouseLayout>,
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
