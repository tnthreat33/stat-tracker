import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function HittingLineup (){
const { state } = useLocation();
const [lineup, setLineup] = useState([]);
console.log(lineup)

  useEffect(() => {
    if (state) {
      setLineup([...lineup, state]);
    }
  }, [state]);

    return(
        <div>
          <h3>Lineup</h3>
            <table>
              <thead>
                <tr>
                  <th>Jersey Number</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>BA</th>
                  <th>AB</th>
                  <th> ERA</th>
                  <th>Errors</th>
                  <th>Hits</th>
                  <th>IP</th>
                  <th>K</th>
                  <th>RBI</th>
                  <th> Runs</th>
                  <th>Stolen Bases</th>
                  <th> Show Game Stats</th>
                </tr>
              </thead>
              <tbody>
                {lineup.map((player) => (
                  <tr key={player.player.id}>
                    <td>{player.player.jersey_number}</td>
                    <td>{player.player.name}</td>
                    <td>{player.player.position}</td>
                    <td>{player.player.season.batting_average !== null ? player.season.batting_average : '-'}</td>
                    <td>{ player.player.season.season_ab !== null ?  player.season.season_ab  : '-'}</td>
                    <td>{ player.player.season.season_era !== null ?  player.season.season_era  : '-'}</td>
                    <td>{player.player.season.season_fielding_error !== null ? player.season_fielding_error: '-'}</td>
                    <td>{ player.player.season.season_hits_average !== null ?  player.season_hits_average : '-'}</td>
                    <td>{ player.player.season.season_ip !== null ?  player.season.season_ip  : '-'}</td>
                    <td>{player.player.season.season_k !== null ? player.season.season_k : '-'}</td>
                    <td>{ player.player.season.season_rbi !== null ?  player.season.season_rbi  : '-'}</td>
                    <td>{ player.player.season.season_runs !== null ?  player.season.season_runs  : '-'}</td>
                    <td>{ player.player.season.season_stolen_bases !== null ?  player.season.stolen_bases : '-'}</td>
                  </tr>
                ))}
              </tbody>
              
            </table>
           
      </div>
    )
    }



export default HittingLineup;