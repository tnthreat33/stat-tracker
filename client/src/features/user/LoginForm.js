import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice"; // Import the action creators
import SignupForm from "./SignupForm";
import "./loginForm.css"

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const error = useSelector((state) => state.auth.error) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        username,
        password,
      };

      // Dispatch the login action and await its completion
      dispatch(login(credentials));

      // Handle successful login if needed (e.g., redirect)
      navigate("/");

      // Clear form fields
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  function handleShowSignUpForm() {
    setShowSignUpForm(true);
  }

  if (showSignUpForm) {
    return <SignupForm />;
  }

  return (
    <div className="centered-container"> 
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="ui input">
          <label>Username </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="ui input">
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="ui red button" type="submit">
          Login
        </button>
      </form>
      <button className="ui button" onClick={handleShowSignUpForm}>
        Sign Up
      </button>
      {error && (
        <div>
          <ul>
            {error && error.errors && error.errors.login && (
              <li>{error.errors.login}</li>
            )}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default LoginForm;
