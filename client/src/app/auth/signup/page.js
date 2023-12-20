"use client";
import { useState } from "react";
import axios from "@/helpers/axios";
import { signUpUrl } from "@/helpers/constant";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(signUpUrl, { email, password });
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const ShowError = () => {
    return (
      <div className="alert alert-danger">
        <h4>Ooops....</h4>
        <ul className="my-0">
          {errors.map((err) => (
            <li key={err.msg}>{err.msg}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors && errors.length > 0 && ShowError()}
      <h1>Sign Up</h1>
      <div className="form-group mb-3">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
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

export default SignUp;
