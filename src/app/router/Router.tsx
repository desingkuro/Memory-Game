import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children:[
            {
                path: "/login",
                element: <h1>Login</h1>
            }
        ]
    }
])
