import React, {useState} from "react";
import { useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerInput from "../players/playersInput";

function TeamDetails() {
  const { teamName } = useParams();
  const teams = useSelector((state) => state.teams.entities);
  const team = teams.find((t) => t.name === teamName);
  const [isInputVisible, setInputVisible] = useState(false);

  if (!team) {
    return <div>Team not found.</div>;
  }

  return (
    <div>
      <p>
      <Link to={{ pathname: `/teams`}}>
          Back To Teams
        </Link>
        </p>
      <h2> {team.name}  " {team.nickname} "</h2>
      <ul>
        <li> {team.address}</li>
        <li> {team.wins} - {team.loses} </li>
        </ul>
        <p>
        <button onClick={() => setInputVisible(!isInputVisible)}>
          Add New Player
        </button>
        
        {isInputVisible && <PlayerInput team={team} />} {/* Render StatInput if isInputVisible is true */}
     
        </p>
        <table>
        <thead>
          <tr>
            <th>Jersey Number</th>
            <th>Name</th>
            <th>Position</th>
            <th>Dominate Hand</th>
            <th>Graduation Year</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player) => (
            <tr key={player.id}>
              <td>{player.jersey_number}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.dominate_hand}</td>
              <td>{player.graduation_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamDetails;
