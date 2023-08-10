import React from "react";
import Team from "./team";

function Teams({ teams }) {
  return (
    <ul>
      {teams.map((r) => (
        <Team key={r.id} restaurant={r} />
      ))}
    </ul>
  );
}

export default Teams;