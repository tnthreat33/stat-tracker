import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateGameStat, fetchStats } from "./statSlice";



function StatUpdateForm() {
  const { statId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = useSelector((state) => state.stats.entities);
  const statToUpdate = stats.find((stat) => stat.id === parseInt(statId));
  const [backendErrors, setBackendErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const [updatedStat, setUpdatedStat] = useState({
    game_id: statToUpdate.game_id,
    player_id: statToUpdate.player_id,
    played: 1,
    ERA: statToUpdate.ERA,
    K: statToUpdate.K,
    RBI: statToUpdate.RBI,
    fielding_percentage: statToUpdate.fielding_percentage,
    batting_average:statToUpdate.batting_average,
    at_bat: statToUpdate.at_bat,
    fielding_error: statToUpdate.fielding_error,
    hits: statToUpdate.hits,
    innings_pitched: statToUpdate.innings_pitched,
    runs: statToUpdate.runs,
    stolen_base: statToUpdate.stolen_base
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Clear backendErrors when submitting
    setBackendErrors([]);

    dispatch(updateGameStat({ id: statId, updatedStat: { ...updatedStat, game_id: parseInt(updatedStat.game_id) } }))
      .then(() => {
        navigate("/stats");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setBackendErrors(error.response.data.error);
        }
      });
  };

  const availableGames = [...new Map(stats.map(stat => [stat.game_id, stat])).values()];
    

    const availablePlayers = useSelector((state) => {
      const players = [];
      state.teams.entities.forEach((team) => {
        players.push(...team.players); // Assuming each team has a "players" property
      });
      return players;
    });

  return (
    <div>
      <h2>Edit Stat</h2>
      <form onSubmit={handleSubmit}>
        <label>ERA:</label>
        <input
          type="number"
          step="0.01"
          name="ERA"
          value={updatedStat.ERA}
          onChange={handleInputChange}
        />
        <label>K:</label>
        <input type="number" name="K" value={updatedStat.K} onChange={handleInputChange} />
        <label>RBI:</label>
        <input type="number" name="RBI" value={updatedStat.RBI} onChange={handleInputChange} />
        <label>AB:</label>
        <input type="number" name="at_bat" value={updatedStat.at_bat} onChange={handleInputChange} />
        <label>BA:</label>
        <input type="number" step="0.01" name="batting_average" value={updatedStat.batting_average} onChange={handleInputChange}/>
        <label>Errors:</label>
        <input type="number" name="fielding_error" value={updatedStat.fielding_error} onChange={handleInputChange}/>
        <label>Fielding %:</label>
        <input type="number" name="fielding_percentage" value={updatedStat.fielding_percentage} onChange={handleInputChange} />
        <label>Hits:</label>
        <input type="number" name="hits" value={updatedStat.hits} onChange={handleInputChange} />
        <label>IP:</label>
        <input type="number" name="innings_pitched" value={updatedStat.innings_pitched} onChange={handleInputChange} />
        <label>Runs:</label>
        <input type="number" name="runs" value={updatedStat.runs} onChange={handleInputChange} />
        <label>Stolen Bases:</label>
        <input type="number" name="stolen_base" value={updatedStat.stolen_base} onChange={handleInputChange}/>

        <label>Game:</label>
        <select name="game_id" value={updatedStat.game_id} onChange={handleInputChange}>
          <option value="">Select an option</option>
          {availableGames.map((option) => (
            <option key={option.id} value={option.game_id}>
              {option.game.away_team_name} vs. {option.game.home_team_name}
            </option>
          ))}
        </select>

        <label>Player:</label>
        <select name="player_id" value={updatedStat.player_id} onChange={handleInputChange}>
          <option value="">Select an option</option>
          {availablePlayers.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button type="submit">Update</button>
      </form>
      {backendErrors.length > 0 && (
        <div className="backend-error">
          <p>Failed to update game stat due to the following errors:</p>
          <ul>
            {backendErrors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StatUpdateForm;