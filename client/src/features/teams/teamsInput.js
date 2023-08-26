import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "./teamsSlice";

function TeamInput() {
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [address, setAddress] = useState("");
  const [wins, setWins] = useState("");
  const [loses, setLoses] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(state => state.teams.error) || [];

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleNickNameChange(event) {
    setNickName(event.target.value);
  }
  function handleAddressChange(event) {
    setAddress(event.target.value);
  }
  function handleWinsChange(event) {
    setWins(event.target.value);
  }
  function handleLosesChange(event) {
    setLoses(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an object with the collected data
    const newTeam = {
      name,
      nickname,
      address,
      wins,
      loses
    };
  
    try {
      // Dispatch the action to send the new game stat data to the backend
      await dispatch(addTeam(newTeam));
  
     
  
      // Clear input fields
      setName("");
      setNickName("");
      setAddress("");
      setWins("");
      setLoses("");
      
    } catch (error) {
      if (error.response && error.response.status === 422) {
        
        console.log(error)
      }
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Nickname
        <input
          type="text"
          name="name"
          value={nickname}
          onChange={handleNickNameChange}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="name"
          value={address}
          onChange={handleAddressChange}
        />
      </label>
      <label>
        Wins
        <input
          type="number"
          name="name"
          value={wins}
          onChange={handleWinsChange}
        />
      </label>
      <label>
        Loses
        <input
          type="number"
          name="name"
          value={loses}
          onChange={handleLosesChange}
        />
      </label>
      <button type="submit">Add Team</button>
    </form>
    {error.error && error.error.length > 0 && (
      <div>
        <p>Errors:</p>
        <ul>
          {error.error.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );
}

export default TeamInput;
