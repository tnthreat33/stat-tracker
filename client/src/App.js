import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { autoLogin } from "./features/user/authSlice";
import { fetchTeams } from "./features/teams/teamsSlice";
import TeamsContainer from "./features/teams/teamContainer";
import TeamDetails from "./features/teams/teamDetails";
import StatContainer from "./features/game_stats/statContainer";
import StatUpdateForm from "./features/game_stats/statUpdateForm";
import LoginForm from "./features/user/LoginForm";
import Dashboard from "./features/dashboard/dashboard";
import { Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import "./App.css"
import YourTeam from "./features/teams/yourTeam";
import Schedule from "./features/games/schedule";



function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  

  useEffect(() => {
    // Dispatch the auto-login action on component mount
    dispatch(autoLogin())
      .then((user) => {
        // Handle successful auto-login if needed
        console.log("Auto-login successful:", user);
        
          dispatch(fetchTeams());
        
      })
      .catch((error) => {
        // Handle auto-login error
        console.error("Auto-login error:", error);
      });
  }, [dispatch]);
  

  if (!currentUser) return <LoginForm  />;


  return (
    <div className="App">
      
      <NavBar user={currentUser}/>
      <Routes>
        <Route path="/team" element={<YourTeam/>}/>
        <Route path="/schedule" element={<Schedule/>}/>
        <Route path="/stats" element={<StatContainer />}/>
        <Route path="/teams" element={<TeamsContainer />} />
        <Route path="/teams/:teamName" element={<TeamDetails/>} />
        <Route path="/stats/update/:statId" element={<StatUpdateForm/>} />
        <Route path="/" element={<Dashboard currentUser={currentUser}/>}/>
        </Routes>
      
    </div>
  );
  
}

export default App;
