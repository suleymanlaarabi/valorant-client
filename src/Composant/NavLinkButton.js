import gsap from 'gsap';
import React, { useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../Context/userContext';

const NavLinkButton = (props) => {
    const { Langage } = useContext(UserContext)
    useEffect(() => {
        gsap
            .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100 })

    }, [])

    return (
        <>
            <NavLink onClick={props.close} className="buttonAnim link" to="/">
                {Langage.NavBar.accueilButtonText}
            </NavLink>
            <NavLink onClick={props.close} className="buttonAnim link" to="/Agents">
                {Langage.NavBar.agentsButtonText}
            </NavLink>
            <NavLink onClick={props.close} className="buttonAnim link" to="/Armes">
                {Langage.NavBar.armesButtonText}
            </NavLink>
            <NavLink onClick={props.close} className="buttonAnim link" to="/Cartes">
                {Langage.NavBar.cartesButtonText}
            </NavLink>
        </>
    );
};

export default NavLinkButton;