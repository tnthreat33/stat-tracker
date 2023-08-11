import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "./statSlice";


function StatContainer() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.teams.entities);
  const status = useSelector((state) => state.teams.status);

  useEffect(() => {
    dispatch(fetchStats()); 
  }, [dispatch]);

  console.log(stats)

  return (
    <p> all stats </p>
  );
}

export default StatContainer;
