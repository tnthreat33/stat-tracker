import React from "react";
import Stat from "./stat";

function Stats({ stats }) {
    console.log(stats)
   
  return (
    <div>
      {stats.map((r) => (
        <Stat key={r.id} stat={r} />
      ))}
   </div>
  );
}

export default Stats;