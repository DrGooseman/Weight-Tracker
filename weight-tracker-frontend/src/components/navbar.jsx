import React from 'react';
import { Link } from "react-router-dom";



function Navbar() {
return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Weight Tracker</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Dashboard</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/edit-weight" className="nav-link">Edit Weight</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create user</Link>
                </li>
            </ul>
        </div>
    </nav>
);
}

export default Navbar;