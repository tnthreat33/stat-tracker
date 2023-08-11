import React from "react";
import TeamsContainer from "./features/teams/teamContainer";
import TeamDetails from "./features/teams/teamDetails";
import { Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import "./App.css"

function App() {
  return (
    <div className="App">
      
      <NavBar />
      <Routes>
        <Route path="/teams" element={<TeamsContainer />} />
        <Route path="/teams/:teamName" element={<TeamDetails/>} />
        </Routes>
      
    </div>
  );
  
}

export default App;
