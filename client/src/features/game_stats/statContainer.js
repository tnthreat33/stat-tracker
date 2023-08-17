import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statSlice";
import Stats from "./stats";
import StatInput from "./statsInput";


function StatContainer() {
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.stats.entities);
    const status = useSelector((state) => state.stats.status);
    const [isInputVisible, setInputVisible] = useState(false); // State to manage form visibility
    
    useEffect(() => {
      dispatch(fetchStats());
    }, [dispatch]);
  
    return (
      <div>
        <p>All stats</p>
        <button onClick={() => setInputVisible(!isInputVisible)}>
          Add New Stat
        </button>
        {isInputVisible && <StatInput stats={stats}/>} {/* Render StatInput if isInputVisible is true */}
     
        <Stats stats={stats} />
        </div>
    );
  }
  
  export default StatContainer;

  
  
  
  
  
