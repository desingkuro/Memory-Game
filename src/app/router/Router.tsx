import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../../features/auth/Login"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
            {
                path:"/",
                element:<h1>Home</h1>
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
