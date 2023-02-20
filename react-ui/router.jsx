import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./src/layouts/GuestLayout";
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
            }
        ]
    },
]);

export default router;