import React from "react";

function Stat({ stat }) {
  if (!stat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <li>
        
        <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Name</th>
            <th>Opponant</th>
            <th>Date</th>
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
          </tr>
        </thead>
        <tbody>
          {stat.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.player.team_name}</td>
              <td>{stat.player.name}</td>
              <td>if{stat.player.team_id} == {stat.game.away_team_id} return {stat.game.home_team_name} 
              else 
              return {stat.game.home_team_name} </td>
              <td>{stat.game.date}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
      </li>
    </div>
  );
}

export default Stat;
