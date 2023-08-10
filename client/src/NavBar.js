import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


function NavBar() {

  return (
    <div className="navbar">
      <header>
        Welcome<button >Logout</button> </header>
        
      <nav>
      <h4>Stat Tracker</h4>
        <ul>
          <li>
            <NavLink to="/teams">All Teams</NavLink>
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