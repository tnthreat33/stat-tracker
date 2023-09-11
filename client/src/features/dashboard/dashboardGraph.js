import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { fetchUserTeam } from "../teams/teamsSlice";
import "./dashboard.css";
import Chart from 'chart.js/auto';
import SeasonStatDropdown from "./dashboardDropdown";


const DashboardGraph = ({userTeams}) => {
  const [selectedStat, setSelectedStat] = useState("batting_average");
  

  if (!userTeams || userTeams.length === 0 || !userTeams[0].players) {
    return <div>Loading...</div>;
  }

  const playerNames = userTeams[0].players.map((player) => player.name);
  const battingAverages = userTeams[0].players.map(
    (player) => player.season.batting_average
  );
  const statDataKey = `${selectedStat}`;

  const statData = userTeams[0].players.map(
    (player) => player.season[statDataKey]
  );

 

  const data = {
    labels: playerNames,
    datasets: [
      {
        label: selectedStat.replace("_", " "), 
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 2,
        data: statData,
      },
    ],
  };

  const handleStatChange = (selectedValue) => {
    setSelectedStat(selectedValue);
  };

  return (
    <div className="chart-container">
    <h3 className="chart-title uppercase">{selectedStat.replace("_", " ")} per Player</h3>
    <SeasonStatDropdown
      onChange={handleStatChange}
      selectedStat={selectedStat}
    />
    <div className="chart-wrapper">
        <Bar
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "start",
                labels: {
                  color: "white"
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.2)"
                },
                ticks: {
                  color: "white",
                  callback: function (value, index) {
                    return data.labels[index]; 
                  }
                }
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.2)"
                },
                ticks: {
                  color: "white",
                  min: 0, 
                  max: 10,
                  stepSize: 0.1
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 100, 
            responsiveAnimationDuration: 200,
            animation: {
              duration: 1000,
              easing: "easeInOutQuart"
            }
          }}
        />
      </div>
    </div>
  );
};

export default DashboardGraph;
