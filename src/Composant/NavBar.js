import gsap from 'gsap';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./css/NavBar.css"
const NavBar = () => {
    useEffect(() => {
        gsap.to(".buttonAnim", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 }).then(() => {
            gsap.to(".logo", { opacity: 1, duration: 0.4, y: 105 })
        })

    }, [])
    return (
        <nav>
            <img className='logo' src="./logo.png" alt="" />
            <NavLink className="buttonAnim" to="/">
                <p>Accueil</p>
            </NavLink>
            <NavLink className="buttonAnim" to="/Agents">
                <p>Agents</p>
            </NavLink>
            <NavLink className="buttonAnim" to="/Armes">
                <p>Armes</p>
            </NavLink>
            <NavLink className="buttonAnim" to="/Cartes">
                <p>Cartes</p>
            </NavLink>

        </nav>
    );
};

export default NavBar;