import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./src/layouts/GuestLayout";
import Cart from "./src/pages/Cart";
import Home from "./src/pages/Home";

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
                path: '/cart',
                element: <Cart />
            }
        ]
    },
]);

export default router;