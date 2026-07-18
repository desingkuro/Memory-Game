import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import React, { Suspense } from "react"
import Loader from "../../shared/components/Loader"

const HomeLazy = React.lazy(() => import("../../features/home/Home"));

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
                element: <HomeLazy />
            }
        ]
    },
])
