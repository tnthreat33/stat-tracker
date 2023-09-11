import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGameStat } from "./statSlice";
import Dropdown from "./dropdown";
import "../games/gameInput.css"; 

function StatInput({ stats }) {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [era, setERA] = useState("");
  const [k, setK] = useState("");
  const [rbi, setRBI] = useState("");
  const [atBat, setAtBat] = useState("");
  const [ba, setBA] = useState("");
  const [errors, setErrors] = useState("");
  const [fieldingPercentage, setFieldingPercentage] = useState("");
  const [hits, setHits] = useState("");
  const [inningsPitched, setInningsPitched] = useState("");
  const [runs, setRuns] = useState("");
  const [stolenBase, setStolenBase] = useState("");
  const error = useSelector((state) => state.stats.error) || [];
  const availableGames = useSelector((state) => state.games.entities)
  

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStat = {
      game_id: selectedGame,
      player_id: selectedPlayer,
      played: 1,
      ERA: era,
      K: k,
      RBI: rbi,
      fielding_percentage: fieldingPercentage,
      batting_average: ba,
      at_bat: atBat,
      field_error: errors,
      hits: hits,
      innings_pitched: inningsPitched,
      runs: runs,
      stolen_base: stolenBase,
    };

    try {
      
      await dispatch(addGameStat(newStat));

      
      setERA("");
      setK("");
      setRBI("");
      setAtBat("");
      setBA("");
      setErrors("");
      setFieldingPercentage("");
      setHits("");
      setInningsPitched("");
      setRuns("");
      setStolenBase("");
      setSelectedGame("");
      setSelectedPlayer("");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        
        console.log(error);
      }
    }
  };

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  

  const availablePlayers = useSelector((state) => {
    const players = [];
    state.teams.entities.forEach((team) => {
      players.push(...team.players); 
    });
    return players;
  });

  const handleERAChange = (event) => {
    setERA(event.target.value);
  };

  const handleKChange = (event) => {
    setK(event.target.value);
  };

  const handleRBIChange = (event) => {
    setRBI(event.target.value);
  };

  const handleatBatChange = (event) => {
    setAtBat(event.target.value);
  };

  const handlebaChange = (event) => {
    setBA(event.target.value);
  };

  const handleerrosChange = (event) => {
    setErrors(event.target.value);
  };

  const handleFieldingPercentageChange = (event) => {
    setFieldingPercentage(event.target.value);
  };

  const handleHitsChange = (event) => {
    setHits(event.target.value);
  };

  const handleInningPitchedChange = (event) => {
    setInningsPitched(event.target.value);
  };

  const handleRunsChange = (event) => {
    setRuns(event.target.value);
  };

  const handleStolenBasesChange = (event) => {
    setStolenBase(event.target.value);
  };

  return (
    <div className="your-team login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add New Stat</h2>

        <div className="ui input">
          <label>ERA:</label>
          <input type="number" step="0.01" value={era} onChange={handleERAChange} />
        </div>

        <div className="ui input">
          <label>K:</label>
          <input type="number" value={k} onChange={handleKChange} />
        </div>

        <div className="ui input">
          <label>RBI:</label>
          <input type="number" value={rbi} onChange={handleRBIChange} />
        </div>

        <div className="ui input">
          <label>AB:</label>
          <input type="number" value={atBat} onChange={handleatBatChange} />
        </div>

        <div className="ui input">
          <label>BA:</label>
          <input type="number" step="0.01" value={ba} onChange={handlebaChange} />
        </div>

        <div className="ui input">
          <label>Errors:</label>
          <input type="number" value={errors} onChange={handleerrosChange} />
        </div>

        <div className="ui input">
          <label>Fielding %:</label>
          <input
            type="number"
            value={fieldingPercentage}
            onChange={handleFieldingPercentageChange}
          />
        </div>

        <div className="ui input">
          <label>Hits:</label>
          <input type="number" value={hits} onChange={handleHitsChange} />
        </div>

        <div className="ui input">
          <label>IP:</label>
          <input
            type="number"
            value={inningsPitched}
            onChange={handleInningPitchedChange}
          />
        </div>

        <div className="ui input">
          <label>Runs:</label>
          <input type="number" value={runs} onChange={handleRunsChange} />
        </div>

        <div className="ui input">
          <label>Stolen Bases:</label>
          <input
            type="number"
            value={stolenBase}
            onChange={handleStolenBasesChange}
          />
        </div>

        <div className="ui input">
          <label>Game:</label>
          <select onChange={(event) => handleGameSelect(event.target.value)}>
            <option value="">Select an option</option>
            {availableGames.map((game) => (
              <option key={game.id} value={game.id}>
                {game.away_team_name} vs. {game.home_team_name}
              </option>
            ))}
          </select>
        </div>


        <div className="ui input">
          <label>Player:</label>
          <Dropdown options={availablePlayers} onSelect={handlePlayerSelect} />
        </div>

        <button className="ui red button" type="submit">
          Add Stat
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

export default StatInput;
