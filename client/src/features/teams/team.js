import React from "react";
import { Link } from "react-router-dom";

function Team({ team }) {
  if (!team) {
    return <div>Loading...</div>;
  }
console.log(team)
  return (
    <div>
      <li>
        {team.name}{" "}
        <Link to={{ pathname: `/teams/${team.name}`, state: { team } }}>
          Click for Team Details
        </Link>
      </li>
    </div>
  );
}

export default Team;
