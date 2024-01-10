import { Link } from "react-router-dom";
import { Home, Login, Register } from "../routes/constants";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../slices";
import { isEmpty } from "lodash";

function Header() {
    const { user, logout } = useAuthStore((state) => state);

    const LoginButton = () => {
        return (
            // <Link to={Login}>
            <div>
                <Button className="text-red-500">Login</Button>
            </div>
            // </Link>
        );
    };

    const RegisterButton = () => {
        return (
            <Link to={Register}>
                <button type="button" className="btn btn-primary me-3">
                    Sign up for free
                </button>
            </Link>
        );
    };

    const LogoutButton = () => {
        return (
            <button
                onClick={() => logout()}
                type="button"
                className="btn px-3 me-2"
            >
                Logout
            </button>
        );
    };

    const isLoggedIn = () => {
        if (isEmpty(user)) {
            return (
                <>
                    {LoginButton()}
                    {RegisterButton()}
                </>
            );
        }

        return LogoutButton();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={Home}>
                                Home
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {isLoggedIn()}
                    </div>
                    <h1>Hello</h1>
                </div>
            </div>
        </nav>
    );
}

export default Header;
