import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../../features/auth/Login"
import Home from "../../features/home/Home"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children:[
            {
                path: "login",
                element: <Login/>
            }
        ]
    }
])
