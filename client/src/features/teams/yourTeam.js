import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "./teamsSlice"; 
import { fetchPlayerGameStats } from "../game_stats/statSlice";
import PlayerGameStats from "../players/playerGameStat";

function YourTeam() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const userTeams = useSelector((state) => state.teams.userTeam); // Assuming this is an array
  const playerStats = useSelector((state)=> state.stats.playerGameStats)
  
 
 
  useEffect(() => {
    dispatch(fetchUserTeam(userId));
  }, [dispatch, userId]);

  const [selectedPlayer, setSelectedPlayer] = useState(null); // Add a state to track the selected player

  const handlePlayerClick = (playerId) => {
    // When a player is clicked, fetch their game stats
    dispatch(fetchPlayerGameStats(playerId));
    setSelectedPlayer(playerId); // Set the selected player's ID
  };

  if (!userTeams || userTeams.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Your Teams</h1>
      {userTeams.map((userTeam) => (
        <div key={userTeam.id}>
          <h2>{userTeam.name} - {userTeam.nickname}</h2>
          <p>Address: {userTeam.address}</p>
          <p>Wins: {userTeam.wins} - Losses: {userTeam.losses}</p>

          <h3>Players</h3>
          <table>
            <thead>
              <tr>
                <th>Jersey Number</th>
                <th>Name</th>
                <th>Position</th>
                <th> Show Stats</th>
              </tr>
            </thead>
            <tbody>
              {userTeam.players.map((player) => (
                <tr key={player.id}>
                  <td>{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>
                    <button onClick={() => handlePlayerClick(player.id)}>
                      Show Stats
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
          {selectedPlayer !== null  && (
            <PlayerGameStats playerStats={playerStats} team={userId.teams}/>
          )}
        </div>
      ))}
    </div>
  );
}

export default YourTeam;
