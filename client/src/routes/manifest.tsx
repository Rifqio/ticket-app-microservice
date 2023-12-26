import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import { Register, Login } from "../pages/auth";
import { Header } from "../components";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Home />
            </>
        ),
    },
    {
        path: "/register",
        element: (
            <>
                <Header />
                <Register />
            </>
        ),
    },
    {
        path: "/login",
        element: (
            <>
                <Header />
                <Login />,
            </>
        ),
    },
]);

export default router;
