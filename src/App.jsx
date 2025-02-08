import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";

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
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;