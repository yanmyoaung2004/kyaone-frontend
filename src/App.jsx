import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemDetails } from "./pages/index";
import AddToCart from "./components/Cards/AddToCart";
import HistoryCard from "./components/Cards/HIstoryCard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ItemDetails />,
    },
    {
      path: "/test",
      element: <HistoryCard />,
    }
  ]);

  return <RouterProvider router={router} />;
}
