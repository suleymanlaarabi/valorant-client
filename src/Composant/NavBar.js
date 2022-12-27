import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/NavBar.css"
const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <button onClick={() => { navigate('/') }} >Accueil</button>
            <button onClick={() => { navigate('/Agents') }}>Agents</button>
            <button onClick={() => { navigate('/Armes') }}>Armes</button>
            <button onClick={() => { navigate('/Cartes') }}>Cartes</button>
        </nav>
    );
};

export default NavBar;