import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "./teamsSlice"; 

function YourTeam() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const userTeams = useSelector((state) => state.teams.userTeam); // Assuming this is an array
console.log(userTeams)
  useEffect(() => {
    dispatch(fetchUserTeam(userId));
  }, [dispatch, userId]);

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
              </tr>
            </thead>
            <tbody>
              {userTeam.players.map((player) => (
                <tr key={player.id}>
                  <td>{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default YourTeam;
