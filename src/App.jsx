import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import { ItemDetails } from "./pages/index";
import { ThemeProvider } from "./components/theme-provider";
import DataProvider from "./context/DataContext";
import SaleHistory from "./pages/SaleHistory";
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
import Echo from "laravel-echo";
import Pusher from "pusher-js";


// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) return <Navigate to="/login" />;
  if (!allowedRoles.some(role=>currentUser.roles.includes(role))) return <Navigate to="/" />;
  return element;
};

// Define Router
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <ProtectedRoute element={<CheckoutPage />} allowedRoles={["customer"]} />,
  },
  {
    path: "/history",
    element: <ProtectedRoute element={<SaleHistory />} allowedRoles={["customer", "admin"]} />,
  },
  {
    path: "/sales-record",
    element: <ProtectedRoute element={<SaleRecord />} allowedRoles={["admin"]} />,
  },
  {
    path: "/sales-dashboard",
    element: <ProtectedRoute element={<SaleLayout><Sale /></SaleLayout>} allowedRoles={["admin", "sales"]} />,
  },
  {
    path: "/sales-orders",
    element: <ProtectedRoute element={<SaleLayout><Order /></SaleLayout>} allowedRoles={["admin", "sales"]} />,
  },
  {
    path: "/sales-deliveries",
    element: <ProtectedRoute element={<SaleLayout><Delivery /></SaleLayout>} allowedRoles={["admin", "delivery"]} />,
  },
  {
    path: "/sales-customers",
    element: <ProtectedRoute element={<SaleLayout><Customer /></SaleLayout>} allowedRoles={["admin", "support"]} />,
  },
  {
    path: "/sales-escalations",
    element: <ProtectedRoute element={<SaleLayout><Escalations /></SaleLayout>} allowedRoles={["admin", "support"]} />,
  },
  {
    path: "/sales-complaints",
    element: <ProtectedRoute element={<SaleLayout><ComplaintsPage /></SaleLayout>} allowedRoles={["admin", "support"]} />,
  },
  {
    path: "/warehouse-dashboard",
    element: <ProtectedRoute element={<WarehouseLayout><Page /></WarehouseLayout>} allowedRoles={["admin", "warehouse"]} />,
  },
  {
    path: "/warehouse-orders",
    element: <ProtectedRoute element={<WarehouseLayout><Orders /></WarehouseLayout>} allowedRoles={["admin", "warehouse"]} />,
  },
  {
    path: "/warehouse-complaints",
    element: <ProtectedRoute element={<WarehouseLayout><Complaints /></WarehouseLayout>} allowedRoles={["admin", "warehouse", "support"]} />,
  },
  {
    path: "/warehouse-stock",
    element: <ProtectedRoute element={<WarehouseLayout><StockManagement /></WarehouseLayout>} allowedRoles={["admin", "warehouse"]} />,
  },
  {
    path: "/product-management",
    element: <ProtectedRoute element={<WarehouseLayout><Products /></WarehouseLayout>} allowedRoles={["admin", "warehouse"]} />,
  },
  {
    path: "/warehouse-returns",
    element: <ProtectedRoute element={<WarehouseLayout><Returns /></WarehouseLayout>} allowedRoles={["admin", "warehouse"]} />,
  },
  {
    path: "/warehouse-trucks",
    element: <ProtectedRoute element={<WarehouseLayout><TruckManagement /></WarehouseLayout>} allowedRoles={["admin", "warehouse", "driver"]} />,
  },
  {
    path: "/warehouse-setting",
    element: <ProtectedRoute element={<WarehouseLayout><Settings /></WarehouseLayout>} allowedRoles={["admin"]} />,
  },
]);

// App Component
const App = () => {

  let token = localStorage.getItem("token")
  console.log(token);
  
  // const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);
  
  useEffect(()=>{
       if(!window.Echo){
        window.pusher = Pusher;
        window.Echo = new Echo({
          broadcaster: 'reverb',
          key: 'h2wzlqilxoubiqls3oem',
          wsHost: 'localhost',
          wsPort: 8080,
          forceTLS : false,
          encrypted: false,
          enabledTransports: ['ws','wss'],
          authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        
        })
        console.log(window.Echo);


        window.Echo.private(`notification.customer`)
  .listen("NewNotification", (e) => {
    console.log("Notification received:", e); // Check if the event is received
  });


    }
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
