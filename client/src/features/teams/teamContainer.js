import React from "react";
import { useSelector } from "react-redux";
import TeamInput from "./teamsInput";
import Teams from "./teams";

function TeamContainer() {
  const teams = useSelector((state) => state.teams.entities);
  return (
    <div>
      <TeamInput />
      <Teams teams={teams} />
    </div>
  );
}

export default TeamContainer;