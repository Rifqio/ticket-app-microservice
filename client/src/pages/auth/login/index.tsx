import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../slices";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const { login, error, success } = useAuthStore((state) => state);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password);
        if (success) {
            navigate("/");
        }
    };

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
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
}

export default Login;
