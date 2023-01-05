import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);



export const Router = () => <RouterProvider router={router} />