import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGame } from "./gamesSlice";


function GameInput({team}) {
  const [home_team, setHomeTeam] = useState("");
  const [away_team, setAwayTeam] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(state => state.games.error) || [];
  const navigate = useNavigate();
  const teams = useSelector((state) => state.teams.entities);
  
  
  
  function handleHomeTeamChange(event) {
    setHomeTeam(event.target.value);
  }
  function handleAwayTeamChange(event) {
    setAwayTeam(event.target.value);
  }
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function handleStateChange(event) {
    setState(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the collected data
    const newGame = {
      home_team_id: home_team,
      away_team_id: away_team,
      date,
      city,
      state,
      
    };

    try {
      // Dispatch the action to send the new player data to the backend
      const response = await dispatch(addGame(newGame)); // Await the dispatch

      // Check if the response indicates success
      if (response.payload) {
        
        navigate(`/schedule`);
      }

      // Clear input fields
      setHomeTeam("");
      setAwayTeam("");
      setDate("");
      setCity("");
      setState("");
      
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
        Home Team
        <input
          type="text"
          name="name"
          value={home_team}
          onChange={handleHomeTeamChange}
        />
      </label>
      <label>
        Away Team
        <input
          type="text"
          name="name"
          value={away_team}
          onChange={handleAwayTeamChange}
        />
      </label>
      <label>
        Date
        <input
          type="date"
          name="name"
          value={date}
          onChange={handleDateChange}
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="name"
          value={city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        State 
        <input
          type="text"
          name="name"
          value={state}
          onChange={handleStateChange}
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

export default GameInput;
