import axios from 'axios';
import gsap from 'gsap';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { UserContext } from '../../Context/userContext';
const Favoris = () => {
    const { getFavoris } = useContext(UserContext)
    const [AgentFavoris, setAgentFavoris] = useState([])
    const setFavorisState = async () => {

        const Fav = await getFavoris()
        setAgentFavoris(Fav)

    }
    useEffect(() => {
        gsap
            .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100 })
        console.log("use effect")
        setFavorisState()

    }, [])
    useLayoutEffect(() => {
        gsap
            .to(".title", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })
            .then(() => {
                gsap.to(".animate", {
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.3,
                    y: 100,
                });
            });
    }, [AgentFavoris])




    return (
        <div >
            <h2>Favoris</h2>
            <div>
                {AgentFavoris[0] ?
                    <div className="Agents ">
                        <> {AgentFavoris.map((agent, key) => {
                            return (
                                <div
                                    className="Agent animate"

                                >
                                    <h2>{agent.pseudo}</h2>
                                    <img src={agent.imageLink} alt="Comming Soon" />
                                </div>
                            );
                        })}</>


                    </div>
                    : <h5>Aucun Agent en favoris</h5>}
            </div>
        </div>
    );
};

export default Favoris;