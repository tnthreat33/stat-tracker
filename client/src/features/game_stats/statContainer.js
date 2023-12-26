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
      dispatch(fetchGames())
    }, [dispatch]);
    
    return (
      <div>
        <h1>All stats</h1>
        
        <button className="new-game-button" onClick={() => setInputVisible(!isInputVisible)}>
          {isInputVisible ? "Close" : "Manually Add New Stat"}
        </button>
        <CSVImportForm /> 
       
        
        {isInputVisible && <StatInput stats={stats} />} 
     
        <Stat stats={stats} />
        </div>
    );
  }
  
  export default StatContainer;

  
  
  
  
  
