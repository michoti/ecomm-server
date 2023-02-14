import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./src/layouts/AuthLayout";
import GuestLayout from "./src/layouts/GuestLayout";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import NotFound from "./src/pages/NotFound";
import Register from "./src/pages/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to="/home" />
            },
            {
                path: '/home',
                element: <Home />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
]);

export default router;