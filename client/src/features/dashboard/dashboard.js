import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardGraph from "./dashboardGraph";
import "./dashboard.css"
import StatBox from "./statBox";
import { fetchUserTeam } from "../teams/teamsSlice";

function Dashboard (){
    const dispatch = useDispatch();
    const userTeams = useSelector((state) => state.teams.userTeam);
    const userId = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchUserTeam(userId));
      }, [dispatch, userId]);
    
      function findPlayerWithMostHits(players) {
        let maxHits = 0;
        let topPlayer = null;
      
        for (const player of players) {
          if (player.season.season_hits_average > maxHits) {
            maxHits = player.season_hits_average;
            topPlayer = player;
          }
        }
      
        return topPlayer;
      }
      function findPlayerWithBestBattingAverage(players) {
        let maxBattingAverage = 0;
        let topPlayer = null;
      
        for (const player of players) {
          if (player.season.batting_average > maxBattingAverage) {
            maxBattingAverage = player.season.batting_average;
            topPlayer = player;
          }
        }
      
        return topPlayer;
      }
      function findPlayerWithLowestERA(players) {
        let minERA = Number.MAX_VALUE;
        let topPlayer = null;
      
        for (const player of players) {
          const era = player.season.season_era;
      
          if (era > 0 && era < minERA) {
            minERA = era;
            topPlayer = player;
          }
        }
      
        return topPlayer;
      }

const topPlayerForHits = findPlayerWithMostHits(userTeams[0].players);
const topPlayerForBattingAverage = findPlayerWithBestBattingAverage(userTeams[0].players);
const topPlayerForERA = findPlayerWithLowestERA(userTeams[0].players);


const hasTopPlayerForHits = topPlayerForHits !== null;
const hasTopPlayerForBattingAverage = topPlayerForBattingAverage !== null;
const hasTopPlayerForERA = topPlayerForERA !== null;                  

return (
    <div className="dashboard-container">
      <h1 className="header">{userTeams[0].name}</h1>
      <div className="stat-boxes-container">
        {hasTopPlayerForHits && (
          <div >
            <StatBox
              title="Most Hits"
              playerName={topPlayerForHits.name}
              seasonStat={topPlayerForHits.season.season_hits_average}
            />
          </div>
        )}
        {hasTopPlayerForBattingAverage && (
          <div >
            <StatBox
              title="Best Batting Average"
              playerName={topPlayerForBattingAverage.name}
              seasonStat={topPlayerForBattingAverage.season.batting_average}
            />
          </div>
        )}
        {hasTopPlayerForERA && (
          <div >
            <StatBox
              title="Lowest ERA"
              playerName={topPlayerForERA.name}
              seasonStat={topPlayerForERA.season.season_era}
            />
          </div>
        )}
      </div>
      <DashboardGraph userTeams={userTeams} />
    </div>
  );
    }



export default Dashboard;