import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login} from "./authSlice"; // Import the action creators

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        username,
        password,
      };

      // Dispatch the login action and await its completion
      const response = await dispatch(login(credentials));

      // Handle successful login if needed (e.g., redirect)
     navigate("/")

      // Clear form fields
      setUsername("");
      setPassword("");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
