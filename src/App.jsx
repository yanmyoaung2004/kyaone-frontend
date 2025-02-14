import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import Complaints from "./pages/Warehouse/complaints/page";
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

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  if (!currentUser) return <Navigate to="/login" />;
  if (
    !allowedRoles.some((role) =>
      currentUser.roles.map((role) => role.name).includes(role)
    )
  )
    return <Navigate to="/" />;
  return element;
};

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
      path: "/warehouse-complaints",
      element: (
        <WarehouseProtectedRoute>
          <WarehouseLayout>
            <Complaints />
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
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
