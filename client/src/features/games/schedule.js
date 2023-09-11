import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "../teams/teamsSlice";
import GameInput from "./gameInput";
import "./gameCard.css"

function Schedule() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const userTeams = useSelector((state) => state.teams.userTeam);
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
      <button
    className="new-game-button"
    onClick={() => setInputVisible(!isInputVisible)}
  >
    {isInputVisible ? "Close" : "Add New Game"}
  </button>

        {isInputVisible && <GameInput team={userTeams} userId={userId} />} 
      </div>
    
      {userTeams.map((userTeam) => (
        <div key={userTeam.id}>
          <h1>{userTeam.name} - {userTeam.nickname}</h1>
          <p>Wins: {userTeam.wins} - Losses: {userTeam.loses}</p>

          <h3>Home Games</h3>
          {userTeam.home_games.length > 0 ? (
            userTeam.home_games.map((game) => (
              <div key={game.id} className="game-card">
                <h3>{game.away_team_name} vs. {game.home_team_name}</h3>
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
              <div key={game.id} className="game-card">
                <h3>{game.away_team_name} vs. {game.home_team_name}</h3>
                <ul>Date: {game.date}</ul>
                <ul>Location: {game.city}, {game.state}</ul>
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
