import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./authSlice";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./loginForm.css"; 

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [showLoginForm, setLoginForm] = useState(false);
  const error = useSelector((state) => state.auth.error) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username,
        password,
        email,
        first_name,
        last_name,
        address,
      };

      const response = await dispatch(signup(newUser));
      navigate("/");

      // Clear form fields
      // setUsername("");
      // setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  function handleShowLoginForm() {
    setLoginForm(true);
  }

  if (showLoginForm) {
    return <LoginForm />;
  }

  return (
    <div className="centered-container"> 
    <div className="login-form-container"> 
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="ui input"> 
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="ui input"> 
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="ui input"> 
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="ui input"> 
          <label>First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="ui input"> 
          <label>Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="ui input"> 
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="ui red button" type="submit"> 
          Signup
        </button>
      </form>
      <button className="ui button" onClick={handleShowLoginForm}> 
        Login
      </button>
      {error && error.errors && error.errors.length > 0 && (
        <div>
          <ul>
            {error.errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default SignupForm;
