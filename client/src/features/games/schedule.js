import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "../teams/teamsSlice";
import GameInput from "./gameInput";

function Schedule() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user);
    const userTeams = useSelector((state) => state.teams.userTeam); // Assuming this is an array
    const [isInputVisible, setInputVisible] = useState(false);

    useEffect(() => {
      dispatch(fetchUserTeam(userId));
    }, [dispatch, userId]);
  
    if (!userTeams || userTeams.length === 0) {
      return <p>Loading...</p>;
    }
  
    return (
        <div>
            <div>
             <button onClick={() => setInputVisible(!isInputVisible)}>
          Add New Game
        </button>
        
        {isInputVisible && <GameInput team={userTeams} />} {/* Render StatInput if isInputVisible is true */}
     
        </div>
          {userTeams.map((userTeam) => (
            <div key={userTeam.id}>
              <h1>{userTeam.name} - {userTeam.nickname}</h1>
              <p>Wins: {userTeam.wins} - Losses: {userTeam.loses}</p>
              
      
              <h3>Home Games</h3>
              {userTeam.home_games.length > 0 ? (
                userTeam.home_games.map((game) => (
                  <div key={game.id}>
                    <p>{game.away_team_name} vs. {game.home_team_name}</p>
                    <ul>Date: {game.date} </ul>
                    <ul>Location: {game.city}, {game.state}</ul>
                  </div>
                ))
              ) : (
                <p>No home games</p>
              )}
      
              <h3>Away Games</h3>
              {userTeam.away_games.length > 0 ? (
                userTeam.away_games.map((game) => (
                  <div key={game.id}>
                    <p>{game.away_team_name} vs. {game.home_team_name}</p>
                    <p>Date: {game.date}</p>
                    <p>Location: {game.city}, {game.state}</p>
                  </div>
                ))
              ) : (
                <p>No away games</p>
              )}
            </div>
          ))}
        </div>
      );
      
  }

export default Schedule;
