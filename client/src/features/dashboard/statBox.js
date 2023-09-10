import React from "react";
import "./dashboard.css"

const StatBox = ({ title, playerName, seasonStat }) => {
  return (
    <div className="stat-box">
      <h4>{title}</h4>
      <p>{playerName}</p>
      <p>Season Total: {seasonStat}</p>
    </div>
  );
};

export default StatBox;
