// client/src/components/StatContainer.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statSlice";
import { fetchGames } from "../games/gamesSlice";
import Stat from "./stat";
import StatInput from "./statsInput";
import CSVImportForm from "./csvImportForm";

function StatContainer() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats.entities);
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchGames());
  }, [dispatch]);

  const handleImport = (importResult) => {
    // Handle the import result if needed
    console.log('Import Result:', importResult);
    // You might want to fetch updated stats after successful import
    dispatch(fetchStats());
  };

  return (
    <div>
      <h1>All stats</h1>

      <button
        className="new-game-button"
        onClick={() => setInputVisible(!isInputVisible)}
      >
        {isInputVisible ? "Close" : "Manually Add New Stat"}
      </button>
      <CSVImportForm onImport={handleImport} />

      {isInputVisible && <StatInput stats={stats} />}

      <Stat stats={stats} />
    </div>
  );
}

export default StatContainer;
