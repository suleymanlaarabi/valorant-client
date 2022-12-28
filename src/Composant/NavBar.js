import gsap from "gsap";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./css/NavBar.css";
const NavBar = () => {
    useEffect(() => {
        gsap.to(".logo", { opacity: 1, duration: 0.4, y: 105 }).then(() => {
            gsap
                .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100, stagger: 0.3 })
                .then(() => {
                    gsap
                        .to(".heroBanner", { opacity: 1, duration: 0.4, y: 200 })
                        .then(() => {
                            gsap.to(".ValorantTitle", {
                                opacity: 1,
                                duration: 0.4,
                                stagger: 0.3,
                                y: 70,
                            });
                        });
                });
        });
    }, []);

    const GsapRestart = () => {
        gsap.to(".logo", { opacity: 1, duration: 0.4, y: 105 }).then(() => {
            gsap.to(".heroBanner", { opacity: 1, duration: 0.4, y: 200 }).then(() => {
                gsap.to(".ValorantTitle", {
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.3,
                    y: 70,
                });
            });
        });
    };
    return (
        <nav>
            <img className="logo" src="./logo.png" alt="" />
            <NavLink onClick={GsapRestart} className="buttonAnim" to="/">
                Accueil
            </NavLink>
            <NavLink className="buttonAnim" to="/Agents">
                Agents
            </NavLink>
            <NavLink className="buttonAnim" to="/Armes">
                Armes
            </NavLink>
            <NavLink className="buttonAnim" to="/Cartes">
                Cartes
            </NavLink>
        </nav>
    );
};

export default NavBar;
