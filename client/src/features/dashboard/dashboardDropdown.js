import React from "react";

const SeasonStatDropdown = ({ onChange, selectedStat }) => {
  const statOptions = [
    "batting_average",
    "season_era",
    "season_fielding_error",
    "season_hits_average",
    "season_ip",
    "season_k",
    "season_rbi",
    "season_runs",
    "season_stolen_bases"
    
  ];

  return (
    <div className="season-stat-dropdown">
      <label htmlFor="stat-select">Select Season Stat:</label>
      <select
        id="stat-select"
        value={selectedStat}
        onChange={(e) => onChange(e.target.value)}
      >
        {statOptions.map((stat) => (
          <option key={stat} value={stat}>
            {stat.replace("_", " ")} {/* Convert underscores to spaces */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonStatDropdown;
