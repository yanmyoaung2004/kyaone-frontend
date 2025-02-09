import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemDetails } from "./pages/index";
import AddToCart from "./components/Cards/AddToCart";
import DataProvider from "./context/DataContext";
import { ThemeProvider } from "./components/theme-provider";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
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
      path: "/test",
      element: <AddToCart />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <RouterProvider router={router} />;
      </DataProvider>
    </ThemeProvider>
  );
}
