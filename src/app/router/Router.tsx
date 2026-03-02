import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "../guard/Guard"
import React, { Suspense } from "react"
import Loader from "../../shared/components/Loader"

/**
 * Lazy loading components
 */
const HomeLazy = React.lazy(() => import("../../features/home/Home"));
const LoginLazy = React.lazy(() => import("../../features/auth/login/Login"));
const ForgotPasswordLazy = React.lazy(() => import("../../features/auth/forgotPassword/ForgotPassword"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader />}>
                <MainLayout />
            </Suspense>
        ),
        children: [
            {
                path: "/",
                element: <ProtectedRoute><HomeLazy /></ProtectedRoute>
            }
        ]
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loader />}>
                <LoginLazy />
            </Suspense>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <Suspense fallback={<Loader />}>
                <ForgotPasswordLazy />
            </Suspense>
        ),
    }
])
