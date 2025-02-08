import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ItemDetails } from "./pages/index";
import AddToCart from "./components/Cards/AddToCart";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children : [
        {
          path : "/", 
          element : <ItemDetails /> 
        },
        {
          path : "/login",
          element : <Login />
        },
        {
          path : "/register",
          element : <Register />
        },
        {
          path: "/test",
          element: <AddToCart />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )

}

export default App;