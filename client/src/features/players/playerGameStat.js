
import React from 'react';

function PlayerGameStats({ playerStats }) {
    

  return (
    <div>
      <h3>Player Game Stats</h3>
      <table>
        <thead>
          <tr>
            <th>Game Date</th>
            <th>ERA</th>
            <th>K</th>
            <th>RBI</th>
            {/* Add more table headers for other stats */}
          </tr>
        </thead>
        <tbody>
          {playerStats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.game.date}</td>
              <td>{stat.ERA}</td>
              <td>{stat.K}</td>
              <td>{stat.RBI}</td>
              {/* Add more table cells for other stats */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerGameStats;
