import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/NavBar.css"
const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <NavLink to="/">
                <p>Accueil</p>
            </NavLink>
            <NavLink to="/Agents">
                <p>Agents</p>
            </NavLink>
            <NavLink to="/Armes">
                <p>Armes</p>
            </NavLink>
            <NavLink to="/Cartes">
                <p>Cartes</p>
            </NavLink>

        </nav>
    );
};

export default NavBar;