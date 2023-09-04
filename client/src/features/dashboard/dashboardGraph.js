import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select"; // For dropdowns
import { useSelector, useDispatch } from "react-redux";
import { fetchUserTeam } from "../teams/teamsSlice";
import PlayerGameStats from "../players/playerGameStat";

const DashboardGraph = ({currentUser}) => {
    const dispatch = useDispatch();
    const userId = currentUser.id;
    const userTeams = useSelector((state) => state.teams.userTeam) || [];
    const playerStats = useSelector((state)=> state.stats.playerGameStats)
  
  useEffect(() => {
    dispatch(fetchUserTeam(userId));
  }, [dispatch, userId]);
   
  
  // Define initial state
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);

  // Define options for the dropdowns (you can fetch these from your data)
  const playerOptions = userTeams.map((player) => ({
    value: player.id,
    label: player.name,
  }));

  const statOptions = [
    { value: "batting_average", label: "Batting Average" },
    { value: "era", label: "ERA" },
    // Add more options for other statistics
  ];

  // Set up chart data (initially empty)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Game Statistics",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  });

  // Update chart data when selectedPlayer or selectedStat changes
  useEffect(() => {
    if (selectedPlayer && selectedStat) {
      // Fetch or calculate data for the selectedPlayer and selectedStat
      // and update the chartData accordingly
      // You should replace the example data below with your actual data fetching logic
      const data = [
        10, 15, 12, 20, 25, 18, 22, 16, 12, 24, 28, 15, 20, 18, 23, 27, 14,
      ];

      setChartData((prevData) => ({
        ...prevData,
        labels: Array.from({ length: data.length }, (_, i) => `Game ${i + 1}`),
        datasets: [
          {
            ...prevData.datasets[0],
            data: data,
          },
        ],
      }));
    }
  }, [selectedPlayer, selectedStat]);

  if (userTeams.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Game Statistics Graph</h3>

      <div>
        <label>Select Player:</label>
        <Select
          options={playerOptions}
          onChange={(selectedOption) => setSelectedPlayer(selectedOption.value)}
          isClearable={true}
        />
      </div>

      <div>
        <label>Select Statistic:</label>
        <Select
          options={statOptions}
          onChange={(selectedOption) => setSelectedStat(selectedOption.value)}
          isClearable={true}
        />
      </div>

      <Line data={chartData} />
    </div>
  );
};

export default DashboardGraph;
