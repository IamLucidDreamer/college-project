import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import React, { lazy, Suspense } from 'react'
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/loader/index"
import Dashboard from "../views/layout/Dashboard";
import ErrorBoundary from "../components/errors/ErrorHandler";

const SignUp = lazy(() => import("../views/auth/Signup"));
const Login = lazy(() => import("../views/auth/Login"))
const VerifyOTP = lazy(() => import("../views/auth/VerifyOTP"))
const ForgotPassword = lazy(() => import("../views/auth/ForgotPassword"))
const NewPassword = lazy(() => import("../views/auth/NewPassword"))

const MainPage = lazy(() => import("../views/dashboardPages/HomePage"))
const DashboardProfile = lazy(() => import("../views/dashboardPages/Profile"))
const DashboardUpdates = lazy(() => import("../views/dashboardPages/UpdatesPage"))
const DashboardAbout = lazy(() => import("../views/dashboardPages/About"))


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/verify-otp",
        element: <VerifyOTP />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/new-password",
        element: <NewPassword />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard/updates",
                element: <DashboardUpdates />,
            },
        ],
    },
    {
        path: "/profile",
        element: <ProtectedRoute><DashboardProfile /></ProtectedRoute>,
    },
    {
        path: "/about",
        element: <DashboardAbout />,
    },
    {
        path: "*",
        element: <Login />,
    }
]);

const Routes = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader coverFullScreen={true} />}>
                <RouterProvider router={router} />
            </Suspense >
        </ErrorBoundary>
    )
}

export default Routes