import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "../guard/Guard"
import React from "react"

/**
 * Lazy loading components
 */
const HomeLazy = React.lazy(() => import("../../features/home/Home"));
const LoginLazy = React.lazy(() => import("../../features/auth/Login"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><HomeLazy /></ProtectedRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginLazy />,
    }
])
