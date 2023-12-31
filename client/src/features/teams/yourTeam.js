import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "./teamsSlice"; 
import { fetchPlayerGameStats } from "../game_stats/statSlice";
import PlayerGameStats from "../players/playerGameStat";
import "./yourTeam.css"
import { Link } from "react-router-dom";

function YourTeam() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const userTeams = useSelector((state) => state.teams.userTeam); 
  const playerStats = useSelector((state)=> state.stats.playerGameStats)
  
 
 console.log(userTeams)


  useEffect(() => {
    dispatch(fetchUserTeam(userId));
  }, [dispatch, userId]);

  const [selectedPlayer, setSelectedPlayer] = useState(null); 

  const handlePlayerClick = (playerId) => {
    
    dispatch(fetchPlayerGameStats(playerId));
    setSelectedPlayer(playerId); 
  };

 
 

  if (!userTeams || userTeams.length === 0) {
    return (
      <div>
        <p className="message">No Teams - Go to All Teams to Add Teams</p>
        <Link to={{ pathname: `/teams` }} className="team-details-button">
          More Details
        </Link>
      </div>
    );
  }

  return (
    <div className="your-team">
      <div className="team-header"/>
      <h1>{userId.name}</h1>
      {userTeams.map((userTeam) => (
        <div key={userTeam.id}>
          <h1>{userTeam.name} - {userTeam.nickname}</h1>
          <p>Address: {userTeam.address}</p>
          <p>Wins: {userTeam.wins} - Losses: {userTeam.loses}</p>
          <Link
        to={{ pathname: `/teams/${userTeam.name}`, state: { userTeam } }}
        className="team-details-button"
      >
        Add More Players
      </Link>
          

          <h3>Players - Season Stats</h3>
          <table>
            <thead>
              <tr>
                <th> photo </th>
                <th>Jersey Number</th>
                <th>Name</th>
                <th>Position</th>
                <th>BA</th>
                <th>AB</th>
                <th> ERA</th>
                <th>Errors</th>
                <th>Hits</th>
                <th>IP</th>
                <th>K</th>
                <th>RBI</th>
                <th> Runs</th>
                <th>Stolen Bases</th>
                <th> Show Game Stats</th>
              </tr>
            </thead>
            <tbody>
              {userTeam.players.map((player) => (
                <tr key={player.id}>
                  <td>
                     {player.image && (
                      <img src={player.image} alt={`Player ${player.name} Image`} style={{ width: '50px', height: '50px' }} />
                      )}
                  </td>
                  <td>{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.season.batting_average !== null ? player.season.batting_average : '-'}</td>
                  <td>{ player.season.season_ab !== null ?  player.season.season_ab  : '-'}</td>
                  <td>{ player.season.season_era !== null ?  player.season.season_era  : '-'}</td>
                  <td>{player.season.season_fielding_error !== null ? player.season.season_fielding_error : '-'}</td>
                  <td>{ player.season.season_hits_average !== null ?  player.season.season_hits_average : '-'}</td>
                  <td>{ player.season.season_ip !== null ?  player.season.season_ip  : '-'}</td>
                  <td>{player.season.season_k !== null ? player.season.season_k : '-'}</td>
                  <td>{ player.season.season_rbi !== null ?  player.season.season_rbi  : '-'}</td>
                  <td>{ player.season.season_runs !== null ?  player.season.season_runs  : '-'}</td>
                  <td>{ player.season.season_stolen_bases !== null ?  player.season.season_stolen_bases : '-'}</td>
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
