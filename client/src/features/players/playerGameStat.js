import React from 'react';

function PlayerGameStats({ playerStats, team }) {
  console.log(playerStats);
  console.log(team);

  return (
    <div className="your-team">
      {playerStats.length > 0 ? (
        <>
          <h3>{playerStats[0].player.name} - Game Stats</h3>
          <table>
            <thead>
              <tr>
                <th>Game Date</th>
                <th>Opponent</th>
                <th>ERA</th>
                <th>K</th>
                <th>RBI</th>
                <th>AB</th>
                <th>BA</th>
                <th>Errors</th>
                <th>Hits</th>
                <th>IP</th>
                <th>Stolen Base</th>
                <th>Runs</th>
              </tr>
            </thead>
            <tbody>
              {playerStats.map((stat) => (
                <tr key={stat.id}>
                  <td>{stat.game.date}</td>
                  <td>
                    {team.id !== stat.game.home_team_id
                      ? stat.game.away_team_name
                      : stat.game.home_team_name}
                  </td>
                  <td>{stat.ERA}</td>
                  <td>{stat.K}</td>
                  <td>{stat.RBI}</td>
                  <td>{stat.at_bat}</td>
                  <td>{stat.batting_average}</td>
                  <td>{stat.field_error}</td>
                  <td>{stat.hits}</td>
                  <td>{stat.innings_pitched}</td>
                  <td>{stat.stolen_base}</td>
                  <td>{stat.runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No Game Stats</p>
      )}
    </div>
  );
}

export default PlayerGameStats;
