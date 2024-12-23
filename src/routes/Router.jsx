
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";
import Home from "../pages/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorElement></ErrorElement>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/auth/register',
            element: <Register></Register>
        },
        {
            path: '/auth/login',
            element: <Login></Login>
        }
      ]
    },
  ]);