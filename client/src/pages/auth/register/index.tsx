/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../slices/authSlice";

function Register() {
    const { register, error, success } = useAuthStore((state) => state);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await register(email, password);
    };

    useEffect(() => {
        if (success) {
            navigate("/");
        }
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
            <h1>Sign Up</h1>
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
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}

export default Register;
