import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import { Register, Login } from "../pages/auth";
import { Navbar } from "@/components";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar />
                <Home />
            </>
        ),
    },
    {
        path: "/register",
        element: (
            <>
                <Navbar />
                <Register />
            </>
        ),
    },
    {
        path: "/login",
        element: (
            <>
                <Navbar />
                <Login />,
            </>
        ),
    },
]);

export default router;
