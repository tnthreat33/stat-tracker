import React from "react";
import "./dashboard.css"

const StatBox = ({ title, playerName, seasonStat, playerImage }) => {
  return (
    <div className="stat-box">
      <h4>{title}</h4>
      <img src={playerImage} alt={`${playerName}'s Image`} />
      <p>{playerName}</p>
      <p>Season Total: {seasonStat}</p>
    </div>
  );
};

export default StatBox;
