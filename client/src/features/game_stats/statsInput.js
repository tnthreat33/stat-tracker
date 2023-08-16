import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statAdded } from "./statSlice";
import Dropdown from "./dropdown";

function StatInput({stats}) {
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


  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the collected data
    const newStat = {
        game_id: selectedGame.id,
        player_id: selectedPlayer.id,
      
      ERA: era,
      K: k,
      RBI: rbi,
      fielding_percentage: fieldingPercentage,
      batting_average:ba,
      at_bat: atBat,
      fielding_error: errors,
      hits: hits,
      innings_pitched: inningsPitched,
      runs: runs,
      stolen_base: stolenBase
    };

    // Dispatch the action to send the new game stat data to the backend
    dispatch(statAdded(newStat));

    
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

  };
  
    const handleGameSelect = (gameId) => {
      setSelectedGame(gameId);
    };
  
   
  
    const handlePlayerSelect = (playerId) => {
      setSelectedPlayer(playerId);
    };
  
    // Fetch available teams and players from your Redux store or API
    const availableGames = useSelector((state) => state.stats.availableGames);
    console.log(availableGames)
    
    const availablePlayers = useSelector((state) => {
      const players = [];
      state.teams.entities.forEach((team) => {
        players.push(...team.players); // Assuming each team has a "players" property
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
      <div>
        <form onSubmit={handleSubmit}>
        <h2>Add New Stat</h2>
        
        <label>ERA:</label>
        <input type="number" step="0.01" value={era} onChange={handleERAChange} />
        <label>K:</label>
        <input type="number" value={k} onChange={handleKChange} />
        <label>RBI:</label>
        <input type="number" value={rbi} onChange={handleRBIChange} />
        <label>AB:</label>
        <input type="number" value={atBat} onChange={handleatBatChange} />
        <label>BA:</label>
        <input type="number" step="0.01" value={ba} onChange={handlebaChange} />
        <label>Errors:</label>
        <input type="number" value={errors} onChange={handleerrosChange} />
        <label>Fielding %:</label>
        <input type="number" value={fieldingPercentage} onChange={handleFieldingPercentageChange} />
        <label>Hits:</label>
        <input type="number" value={hits} onChange={handleHitsChange} />
        <label>IP:</label>
        <input type="number" value={inningsPitched} onChange={handleInningPitchedChange} />
        <label>Runs:</label>
        <input type="number" value={runs} onChange={handleRunsChange} />
        <label>Stolen Bases:</label>
        <input type="number" value={stolenBase} onChange={handleStolenBasesChange} />

        <label>Game:</label>
        <select onSelect={handleGameSelect}>
      <option value="">Select an option</option>
      {availableGames.map((option) => (
        <option key={option.id} value={option.id}>
          {option.away_team} vs. {option.home_team}
        </option>
      ))}
    </select>
        
        <label>Player:</label>
        <Dropdown options={availablePlayers} onSelect={handlePlayerSelect} />
        <button type="submit">Add Stat</button>
        </form>
      </div>
    );
  }
  
  export default StatInput;