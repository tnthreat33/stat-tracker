import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlayer } from "./playersSlice";

function PlayerInput({team}) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [graduation_year, setGradYear] = useState("");
  const [dominate_hand, setDominateHand] = useState("");
  const [jersey_number, setJerseyNumber] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(state => state.players.error) || [];
  const navigate = useNavigate();
  const id = team.id
  
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
      jersey_number,
      team_id: id
    };

    try {
      // Dispatch the action to send the new player data to the backend
      const response = await dispatch(addPlayer(newPlayer)); // Await the dispatch

      // Check if the response indicates success
      if (response.payload) {
        
        navigate(`/teams/${team.name}`);
      }

      // Clear input fields
      setName("");
      setPosition("");
      setDominateHand("");
      setGradYear("");
      setJerseyNumber("");
      
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error);
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
          type="text"
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
