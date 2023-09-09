import React from "react";
import { Link } from "react-router-dom";
import "./team.css";

function Team({ team }) {
  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="team-card">
      <h2>{team.name}</h2>
      <Link
        to={{ pathname: `/teams/${team.name}`, state: { team } }}
        className="team-details-button"
      >
        More Details
      </Link>
    </div>
  );
}

export default Team;
