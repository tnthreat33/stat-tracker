import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "./teamsSlice";
import TeamInput from "./teamsInput";
import Teams from "./teams";

function TeamContainer() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.entities);
  const status = useSelector((state) => state.teams.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeams());
    }
  }, [status, dispatch]);

  return (
    <div>
      <TeamInput />
      <Teams teams={teams} />
    </div>
  );
}

export default TeamContainer;
