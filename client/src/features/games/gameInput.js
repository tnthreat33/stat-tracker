import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGame } from "./gamesSlice";
import "./gameInput.css"

function GameInput({ team }) {
  const [home_team, setHomeTeam] = useState("");
  const [away_team, setAwayTeam] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.games.error) || [];
  const navigate = useNavigate();
  const teams = useSelector((state) => state.teams.entities);

  const handleHomeTeamSelect = (gameId) => {
    setHomeTeam(gameId);
  };
  const handleAwayTeamsSelect = (gameId) => {
    setAwayTeam(gameId);
  };

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
    <div className="login-form-container">
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="ui.input">
          <label>Home Team </label>
          <select onChange={(event) => handleHomeTeamSelect(event.target.value)}>
            <option value="">Select an option</option>
            {teams.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ui.input">
          <label>Away Team </label>
          <select onChange={(event) => handleAwayTeamsSelect(event.target.value)}>
            <option value="">Select an option</option>
            {teams.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ui.input">
          <label>Date </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="ui.input">
          <label>City </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <div className="ui.input">
          <label>State </label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleStateChange}
          />
        </div>
        <button className="ui.red.button" type="submit">
          Add Game
        </button>
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
