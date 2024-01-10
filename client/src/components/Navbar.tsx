import { Button, buttonVariants } from "@/components/ui/button";
import { Login, NavItems, Register } from "@/routes/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="relative px-4 py-4 flex justify-between items-center">
                <div className="flex items-start">
                    <Link to="/">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Logo
                        </h1>
                    </Link>
                </div>

                <ul  className="flex items-center ml-32 justify-center space-x-8">
                    {NavItems.map((item) => (
                        <>
                            <li key={item.name}>
                                <Link
                                    className="text-md font-semibold text-gray-500 hover:text-blue-500"
                                    to={item.link}
                                >
                                    {item.name}
                                </Link>
                            </li>
                            <li className="text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4 current-fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </li>
                        </>
                    ))}
                </ul>

                <div className="flex items-end space-x-6">
                    <Link
                        to={Login}
                        className={`${buttonVariants({
                            variant: "ghost",
                        })} py-2 px-6 rounded-xl`}
                    >
                        Sign In
                    </Link>
                    <Button asChild className="py-2 px-6 rounded-xl">
                        <Link to={Register}>Sign Up</Link>
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
