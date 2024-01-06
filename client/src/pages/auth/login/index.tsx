import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../slices";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const { login, error, success, cleanupSuccess } = useAuthStore(
        (state) => state
    );

    const authGoogleUrl = 'http://localhost:4000/api/users/signin/google';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password);
    };

    useEffect(() => {
        if (success) {
            navigate("/");
        }

        return () => {
            cleanupSuccess();
        };
    }, [success, navigate]);

    const ShowError = () => {
        return (
            <div className="alert alert-danger">
                <h4>Ooops....</h4>
                <ul className="my-0">
                    <p>{error}</p>
                </ul>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && ShowError()}
            <h1>Sign In</h1>
            <div className="form-group mb-3">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                />
            </div>
            <div className="form-group mb-3">
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary mx-4">Sign In</button>
            <Link to={authGoogleUrl} className="btn btn-primary">Signin With Google</Link>
        </form>
    );
}

export default Login;
