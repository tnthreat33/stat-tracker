import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "./authSlice";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const[last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [showLoginForm, setLoginForm] = useState(false);
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username,
        password,
        email, 
        first_name,
        last_name,
        address
      };

      const response = await dispatch(signup(newUser));
      navigate("/")
      setError([]);
      // Clear form fields
      // setUsername("");
      // setPassword("");
    } catch (error) {
      console.log(error)
      if (error.response) {
        // Set the backendErrors state with the error messages
        setError(error.response.data.error);
    }
  }};

  function handleShowLoginForm() {
    setLoginForm(true);
  }

  if (showLoginForm) {
    return <LoginForm />;
  }

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
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          </div>
          <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleShowLoginForm}>Login</button>
      {error.length > 0 && (
        <div >
          <p>Failed Login:</p>
          <ul>
            {error.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default SignupForm;
