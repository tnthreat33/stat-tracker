import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "./teamsSlice";

function YourTeam (){
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user);
    const userTeam = useSelector((state) => state.teams.userTeam);
    console.log(userId)

    useEffect(() => {
        dispatch(fetchUserTeam(userId.id));
      }, [dispatch, userId]);
    
      if (!userTeam) {
        return <p>Loading...</p>;
      }

      console.log(userTeam)
    return(
        <div>
          <h1>Team Details</h1>
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
              {/* {userTeam.players.map((player) => (
                <tr key={player.id}>
                  <td>{player.jersey_number}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                </tr> */}
              {/* ))} */}
            </tbody>
          </table>
        </div>
      );
    }


export default YourTeam;