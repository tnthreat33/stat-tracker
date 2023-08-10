import React from "react";
import { useDispatch } from "react-redux";
import { teamRemoved } from "./teamsSlice";

function Team({ team }) {
  const dispatch = useDispatch();

  if (!team) {
    return <div>Loading...</div>;
  }

  function handleDeleteClick() {
    dispatch(teamRemoved(team.id));
  }

  return (
    <div>
      <li>
        {team.name}
        <button onClick={handleDeleteClick}>DELETE Team</button>
      </li>
    </div>
  );
}

export default Team;
