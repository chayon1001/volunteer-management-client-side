
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../pages/ErrorElement";
import Home from "../pages/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AllVolunteers from "../components/allVolunteers/AllVolunteers";

import ManageMyPosts from "../components/manageMyPosts/ManageMyPosts";
import AddVolunteerPost from "../components/addVolunteer/AddVolunteerPost";
import BlogSection from "../pages/blogSection/BlogSection";
import ContactUs from "../pages/contacUs/ContactUs";
import VolunteerPostDetail from "../components/volunteerPostDetail/VolunteerPostDetail";
import VolunteerRequestForm from "../components/volunteerRequestForm/VolunteerRequestForm";
import UpdatePost from "../components/updatePost/UpdatePost";
import MyVolunteerRequestPost from "../components/myVolunteerRequestPost/MyVolunteerRequestPost";
import PrivateRoute from "./PrivateRoute";

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
                path: "/blogSection",
                element: <BlogSection></BlogSection>
            },

            {
                path: "/contactUs",
                element: <ContactUs></ContactUs>
            },



            {
                path: "/addVolunteer",
                element: <PrivateRoute>
                    <AddVolunteerPost></AddVolunteerPost>
                </PrivateRoute>

            },

            {
                path: '/volunteers/:id',
                element: <PrivateRoute>
                    <VolunteerPostDetail></VolunteerPostDetail>
                </PrivateRoute>
            },

            {
                path: "/volunteer-request/:id",
                element: <VolunteerRequestForm></VolunteerRequestForm>

            },
            {
                path: '/manageMyPosts',
                element: <PrivateRoute>
                    <ManageMyPosts></ManageMyPosts>
                </PrivateRoute>
            },
            {
                path: '/update/:id',
                element: <PrivateRoute>
                    <UpdatePost></UpdatePost>
                </PrivateRoute>
            },
            {
                path: '/myVolunteerRequestPost',
                element: <MyVolunteerRequestPost></MyVolunteerRequestPost>
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