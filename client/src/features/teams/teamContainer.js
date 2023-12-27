import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "./teamsSlice";
import TeamInput from "./teamsInput";
import Team from "./team"; 

function TeamContainer() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.entities);
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  console.log(teams)}, [dispatch]);

  return (
    <div>
      <button className="new-game-button" onClick={() => setInputVisible(!isInputVisible)}>
        Add New Team
      </button>

      {isInputVisible && <TeamInput />}

      <div className="team-container">
        {Array.isArray(teams) ? (
          teams.map((team) => (
            <Team key={team.id} team={team} />
          ))
        ) : (
          <p>No teams available.</p>
        )}
      </div>
    </div>
  );
}

export default TeamContainer;
