import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useDispatch } from "react-redux";
import { logout } from './features/user/authSlice';


function NavBar({user}) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout()); // Use the correct action creator
  }

  return (
    <div className="navbar">
      <header>
        Welcome, {user.first_name} <button onClick={handleLogout}>Logout</button> </header>
        
      <nav>
      <h4>Stat Tracker</h4>
        <ul>
        <li>
            <NavLink to="/stats">All Stats</NavLink>
          </li>
          <li>
            <NavLink to="/teams">All Teams</NavLink>
          </li>
          <li>
            <NavLink to="/"> Dashboard</NavLink>
          </li>
          {/* <li>
            <NavLink to="/courts">Courts</NavLink>
          </li>
          <li>
            <NavLink to="/reservations">Reservations</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;