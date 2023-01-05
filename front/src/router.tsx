import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import ListTransactions from "./pages/ListTransactions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/transactions",
        element: <ListTransactions />,
    },
]);



export const Router = () => <RouterProvider router={router} />