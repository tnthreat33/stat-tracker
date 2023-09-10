import React from "react"
import DashboardGraph from "./dashboardGraph";
import "./dashboard.css"

function Dashboard ({currentUser}){
console.log(currentUser)
    return(
       <>
       <h1 className= "header"> {currentUser.teams[0].name}</h1>
        <DashboardGraph currentUser={currentUser}/>
        </>
       
    )
    }



export default Dashboard;