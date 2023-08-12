import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { statAdded } from "./statSlice";
import Dropdown from "./dropdown";

function StatInput() {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleHomeTeamSelect = (teamId) => {
    setSelectedHomeTeam(teamId);
  };

  const handleAwayTeamSelect = (teamId) => {
    setSelectedAwayTeam(teamId);
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  // Fetch available teams and players from your Redux store or API
  const availableTeams = []; // Replace with your available teams data
  const availablePlayers = []; // Replace with your available players data

  return (
    <div>
      <h2>Add New Stat</h2>
      <label>Home Team:</label>
      <Dropdown options={availableTeams} onSelect={handleHomeTeamSelect} />
      <label>Away Team:</label>
      <Dropdown options={availableTeams} onSelect={handleAwayTeamSelect} />
      <label>Player:</label>
      <Dropdown options={availablePlayers} onSelect={handlePlayerSelect} />
      {/* Other input fields for stats */}
      <button>Add Stat</button>
    </div>
  );
}

export default StatInput;
