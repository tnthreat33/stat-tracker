import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statSlice";
import Stat from "./stat";
import StatInput from "./statsInput";


function StatContainer() {
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.stats.entities);
    const [isInputVisible, setInputVisible] = useState(false); // State to manage form visibility
    
  
    useEffect(() => {
      dispatch(fetchStats());
    }, [dispatch]);
    
    return (
      <div>
        <h1>All stats</h1>
        
        <button className="new-game-button" onClick={() => setInputVisible(!isInputVisible)}>
          Add New Stat
        </button>
        
        {isInputVisible && <StatInput stats={stats} />} {/* Render StatInput if isInputVisible is true */}
     
        <Stat stats={stats} />
        </div>
    );
  }
  
  export default StatContainer;

  
  
  
  
  
