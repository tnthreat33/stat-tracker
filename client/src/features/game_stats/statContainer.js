import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statSlice";
import Stats from "./stats";


function StatContainer() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.teams.entities);
  const status = useSelector((state) => state.teams.status);

  useEffect(() => {
    dispatch(fetchStats()); 
  }, [dispatch]);

  console.log(stats)

  return (
    <div>
    <p> all stats </p>
    <Stats stats={stats} />
    </div>
  );
}

export default StatContainer;
