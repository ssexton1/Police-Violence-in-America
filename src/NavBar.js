import React from 'react';
import { NavLink } from 'react-router-dom';

/* Returns the Navigation Bar for the website with links to the Map, About, Report Incidents and Table pages. */
function NavBar() {
    return (
        <div>
            <nav>
                <NavLink exact to="/" activeClassName="activeLink">Map</NavLink>
                <NavLink exact to="/about" activeClassName="activeLink">About</NavLink>
                <NavLink to="/report" activeClassName="activeLink">Report Incidents</NavLink>
                <NavLink exact to="/table" activeClassName="activeLink">Table</NavLink>
            </nav>
        </div>
    )
}

export default NavBar;