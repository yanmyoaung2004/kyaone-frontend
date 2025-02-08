import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemDetails } from "./pages/index";
import AddToCart from "./components/Cards/AddToCart";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ItemDetails />,
    },
    {
      path: "/test",
      element: <AddToCart />,
    }
  ]);

  return <RouterProvider router={router} />;
}
