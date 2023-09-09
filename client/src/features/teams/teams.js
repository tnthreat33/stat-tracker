import React from "react";
import Team from "./team";
import "./team.css";

function Teams({ teams }) {
  return (
    <div className="team-container">
      {teams.map((r) => (
        <Team key={r.id} team={r} />
      ))}
    </div>
  );
}

export default Teams;
