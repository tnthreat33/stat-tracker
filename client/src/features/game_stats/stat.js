import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { deleteGameStat } from "./statSlice";
import "../teams/yourTeam.css";


function Stat({ stats }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  if (!stats) {
    return <div>Loading...</div>;
  }

  const handleDeleteStat = (statId) => {
    dispatch(deleteGameStat(statId));
  };

  const groupedStats = {};
  stats.forEach((stat) => {
    const playerId = stat.player.id;
    if (!groupedStats[playerId]) {
      groupedStats[playerId] = [];
    }
    groupedStats[playerId].push(stat);
  });

  return (
    <div className="your-team">
      
        {Object.keys(groupedStats).map((playerId) => (
          <div key={playerId}>
            <h3>
              {groupedStats[playerId][0].player.name} -{" "}
              {groupedStats[playerId][0].player.team_name}
            </h3>
            <table className="your-team-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Opponent</th>
                  <th>ERA</th>
                  <th>K</th>
                  <th>RBI</th>
                  <th>AB</th>
                  <th>BA</th>
                  <th>Errors</th>
                  <th>Fielding%</th>
                  <th>H</th>
                  <th>IP</th>
                  <th>Runs</th>
                  <th>SB</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedStats[playerId].map((stat) => (
                  <tr key={stat.id}>
                    <td>{stat.game.date}</td>
                    <td>
                      {stat.player.team_id === stat.game.away_team_id
                        ? stat.game.home_team_name
                        : stat.game.away_team_name}
                    </td>
                    <td>{stat.ERA}</td>
                    <td>{stat.K}</td>
                    <td>{stat.RBI}</td>
                    <td>{stat.at_bat}</td>
                    <td>{stat.batting_average}</td>
                    <td>{stat.field_error}</td>
                    <td>{stat.fielding_percentage}</td>
                    <td>{stat.hits}</td>
                    <td>{stat.innings_pitched}</td>
                    <td>{stat.runs}</td>
                    <td>{stat.stolen_base}</td>
                    <td>
                      <button
                        className="your-team-button"
                        onClick={() => handleDeleteStat(stat.id)}
                      >
                        Delete
                      </button>
                      
                      
                      <button
                        className="your-team-button"
                        onClick={() => {
                          navigate(`/stats/update/${stat.id}`);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      
    </div>
  );
}

export default Stat;
