import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Login from "../../features/auth/Login"
import Home from "../../features/home/Home"
import ProtectedRoute from "../guard/Guard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><Home /></ProtectedRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
])
