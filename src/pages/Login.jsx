import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null);
  // console.log(inputs);

  const navigate = useNavigate();
  // console.log(inputs);

  const { login } = useContext(AuthContext);
  // console.log(inputs);

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post("http://localhost:8080/api/auth/login", inputs, {
      headers: {
        // Access-Control-Allow-Origin: *,
        // Access-Control-Allow-Methods: GET, POST, PUT, DELETE,
        // Access-Control-Allow-Headers: Content-Type,
        // "Access-Control-Allow-Origin": "*"
      }
    });
    navigate("/");
    // console.log("handleSubmit");
  } catch (err) {
    setError(err);
    // console.log("login error", error);
  }
}  // console.log(inputs)


  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" name="username" onChange={handleChange} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {/* {error && <p>{error.message}</p>} */}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
