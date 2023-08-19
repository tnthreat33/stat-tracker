import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./authSlice"; // Import the action creators

const SignupForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup API request here and get user data and token

    // Dispatch actions to update Redux store
    dispatch(setUser(user));
    dispatch(setToken(token));

    // Clear form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
