import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children : [
        {
          path : "/", 
          element : <Home /> 
        },
        {
          path : "/login",
          element : <Login />
        },
        {
          path : "/register",
          element : <Register />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;