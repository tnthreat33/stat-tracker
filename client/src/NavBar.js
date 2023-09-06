import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useDispatch } from "react-redux";
import { logout } from './features/user/authSlice';

function NavBar({ user }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="navbar">
      <header>
        Welcome, {user.first_name} <button onClick={handleLogout}>Logout</button>
      </header>

      <nav>
        <h4>Stat Tracker</h4>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/team">Your Team</NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className="schedule">Your Schedule</NavLink>
          </li>
          <li>
            <NavLink to="/stats">All Stats</NavLink>
          </li>
          <li>
            <NavLink to="/teams">All Teams</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
