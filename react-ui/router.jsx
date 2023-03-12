import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./src/layouts/GuestLayout";
import SignUp from "./src/pages/SignUp";
import Cart from "./src/pages/Cart";
import Home from "./src/pages/Home";
import SignIn from "./src/pages/SignIn";
import NotFound from "./src/pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to="/home" />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
]);

export default router;