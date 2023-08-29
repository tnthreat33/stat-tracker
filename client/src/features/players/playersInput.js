import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "./playersSlice";

function PlayerInput() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [graduation_year, setGradYear] = useState("");
  const [dominate_hand, setDominateHand] = useState("");
  const [jersey_number, setJerseyNumber] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(state => state.players.error) || [];
  
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePositionChange(event) {
    setPosition(event.target.value);
  }
  function handleGradYearChange(event) {
    setGradYear(event.target.value);
  }
  function handleDominateHandChange(event) {
    setDominateHand(event.target.value);
  }
  function handleJerseyNumberChange(event) {
    setJerseyNumber(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an object with the collected data
    const newPlayer = {
      name,
      position,
      graduation_year,
      dominate_hand,
      jersey_number
    };
  
    try {
      // Dispatch the action to send the new game stat data to the backend
      await dispatch(addPlayer(newPlayer));
  
     
  
      // Clear input fields
      setName("");
      setPosition("");
      setDominateHand("");
      setGradYear("");
      setJerseyNumber("");
      
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
        Graduation Year
        <input
          type="number"
          name="name"
          value={graduation_year}
          onChange={handleGradYearChange}
        />
      </label>
      <label>
        Position
        <input
          type="text"
          name="name"
          value={position}
          onChange={handlePositionChange}
        />
      </label>
      <label>
        Dominate Hand
        <input
          type="number"
          name="name"
          value={dominate_hand}
          onChange={handleDominateHandChange}
        />
      </label>
      <label>
        Jersey Number 
        <input
          type="number"
          name="name"
          value={jersey_number}
          onChange={handleJerseyNumberChange}
        />
      </label>
      <button type="submit">Add Player</button>
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

export default PlayerInput;
