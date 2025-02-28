import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ItemDetails } from "./pages/index";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import SaleHistory from "./pages/SaleHistory";
import SaleRecord from "./pages/SaleRecord";
import Sale from "./pages/Sale";

// Warehouse Pages
import WarehouseLayout from "./pages/Warehouse/Layout";
import Order from "./pages/orders/page";
import Delivery from "./pages/deliveries/page";
import Escalations from "./pages/escalations/page";
import Customer from "./pages/customers/page";
import ComplaintsPage from "./pages/complaints/Page";
import Page from "./pages/Warehouse/Page";
import Orders from "./pages/Warehouse/orders/page";
import StockManagement from "./pages/Warehouse/stock/page";
import Returns from "./pages/Warehouse/returns/page";
import TruckManagement from "./pages/Warehouse/trucks/page";
import Settings from "./pages/Warehouse/settings/page";

// Auth
import SaleProtectedRoute from "./auth/SaleProtectedRoute";
import WarehouseProtectedRoute from "./auth/WarehouseProtectedRoute";

// Context and Theme
import DataProvider from "./context/DataContext";
import { ThemeProvider } from "./components/theme-provider";

// Sales Pages
import SaleLayout from "./pages/layout";
import DeliveryDetail from "./pages/deliveries/deliveryDetail";
import Products from "./components/Warehouse/products/Products";
import { Toaster } from "@/components/ui/toaster";
import ProductList from "./pages/ProductList";
import CustomerComplaint from "./pages/CustomerComplaint";
import Cities from "./components/Warehouse/city/City";

// Driver
import DriverProtectedRoute from "./auth/DriverProtectedRoute";
import DriversLayout from "./pages/DriversApp/layout";
import DriverPage from "./pages/DriversApp/page";
import EscalatedIssues from "./components/Drivers/escalated-model";
import ServiceCenter from "./components/Warehouse/service-center/ServiceCenter";
import Warehouse from "./components/Warehouse/warehouse/Warehouse";
import WarehouseProduct from "./components/Warehouse/warehouseProduct/WarehouseProduct";
import PurchasePage from "./components/Warehouse/purchase/PurchasePage";
import PurchaseList from "./components/Warehouse/purchase/PurchaseList";
import PurchaseDetail from "./components/Warehouse/purchase/PurchaseDetail";
import AssignPurchasedProduct from "./components/Warehouse/purchase/AssignPurchasedProduct";
import AssignPage from "./components/Warehouse/purchase/AssignPage";
import WarehouseTransfer from "./components/Warehouse/warehouse/WarehouseTransfer";
import LogisticLayout from "./components/logistics/LogisticLayout";
import SalesReport from "./pages/reports/SaleReports";
import ReportList from "./pages/reports/ReportList";
import ChatCustomerList from "./pages/customersChat/ChatCustomerList";

// App Component
const App = () => {
  const router = createBrowserRouter([
    // Public Routes
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

    // Protected Routes (Sales)
    {
      path: "/sales-record",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <SaleRecord />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-dashboard",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Sale />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-customer",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <ChatCustomerList />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-orders",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Order />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-deliveries",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Delivery />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-returns",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Returns />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/warehouse-cities",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Cities />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-service-centers",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <ServiceCenter />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/sales-deliveries/detail/:truckId",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <DeliveryDetail />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-customers",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Customer />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-escalations",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <Escalations />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-complaints",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <ComplaintsPage />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },

    // Protected Routes (Warehouse)
    {
      path: "/warehouse-dashboard",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Page />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-orders",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Orders />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-stock",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <StockManagement />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/product-management",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Products />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-trucks",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <TruckManagement />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-setting",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Settings />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouses",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Warehouse />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-product/:warehouseId",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <WarehouseProduct />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/warehouse-transfer",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <WarehouseTransfer />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/purchase",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <PurchaseList />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/purchase-detail/:invoice_number",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <PurchaseDetail />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/purchase-create",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <PurchasePage />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/purchase-assign/:invoice_number",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <AssignPurchasedProduct />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/purchase/test",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <AssignPage />
          </WarehouseLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/driver-dashboard",
      element: (
        <DriverProtectedRoute>
          <DriversLayout>
            <DriverPage />
          </DriversLayout>
        </DriverProtectedRoute>
      ),
    },
    {
      path: "/driver-escalated",
      element: (
        <DriverProtectedRoute>
          <DriversLayout>
            <EscalatedIssues />
          </DriversLayout>
        </DriverProtectedRoute>
      ),
    },
    {
      path: "/logistic-orders",
      element: (
        <WarehouseProtectedRoute>
          <LogisticLayout>
            <Orders />
          </LogisticLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/logistic-cities",
      element: (
        <WarehouseProtectedRoute>
          <LogisticLayout>
            <Cities />
          </LogisticLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/logistic-service-centers",
      element: (
        <WarehouseProtectedRoute>
          <LogisticLayout>
            <ServiceCenter />
          </LogisticLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/logistic-trucks",
      element: (
        <WarehouseProtectedRoute>
          <LogisticLayout>
            <TruckManagement />
          </LogisticLayout>
        </WarehouseProtectedRoute>
      ),
    },
    {
      path: "/sales-reports",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <ReportList />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "/sales-reports-detail/:id",
      element: (
        <SaleProtectedRoute>
          <SaleLayout>
            <SalesReport />
          </SaleLayout>
        </SaleProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
