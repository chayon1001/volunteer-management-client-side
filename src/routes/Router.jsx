
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";
import Home from "../pages/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AllVolunteers from "../components/allVolunteers/AllVolunteers";

import ManageMyPosts from "../components/manageMyPosts/ManageMyPosts";
import AddVolunteerPost from "../components/addVolunteer/AddVolunteerPost";

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
            path: "/allVolunteer",
            element: <AllVolunteers></AllVolunteers>
        },

        {
            path: "/addVolunteer",
            element: <AddVolunteerPost></AddVolunteerPost>

        },
        {
            path: '/manageMyPosts',
            element: <ManageMyPosts></ManageMyPosts>
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