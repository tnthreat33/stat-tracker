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
    <div className="your-team"> 
      <p>
        <Link to={{ pathname: `/teams` }} className="team-details-button">
          Back To Teams
        </Link>
      </p>
      <h2> {team.name}  " {team.nickname} "</h2>
        <h4> {team.address}</h4>
        <h4> {team.wins} - {team.loses} </h4>
        <p>
          <button
            className="your-team-button" 
            onClick={() => setInputVisible(!isInputVisible)}
          >
            {isInputVisible ? "Close" : "Add New Player"}
          </button>

          {isInputVisible && <PlayerInput team={team} />} 
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

