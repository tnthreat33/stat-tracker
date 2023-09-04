import React from "react"
import DashboardGraph from "./dashboardGraph";

function Dashboard ({currentUser}){
console.log(currentUser)
    return(
        <DashboardGraph currentUser={currentUser}/>
    )
    }



export default Dashboard;