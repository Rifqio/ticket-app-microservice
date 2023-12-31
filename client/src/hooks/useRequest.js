import axios from "@/helpers/axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState(null);

  const ErrorMessage = () => {
    if (errors.length > 0) {
      return (
        <>
          {errors.map((err) => (
            <li key={err.msg}>{err.msg}</li>
          ))}
        </>
      );
    }
    return <li>{errorMsg}</li>;
  };

  const AlertError = () => {
    return (
      <div className="alert alert-danger">
        <h4>Ooops....</h4>
        <ul className="my-0">
         {ErrorMessage()}
        </ul>
      </div>
    );
  };

  const makeRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors || []);
      setErrorMsg(error.response.data.error);
    }
  };

  return { makeRequest, errors, setErrorMsg, AlertError }
};

export default useRequest;
