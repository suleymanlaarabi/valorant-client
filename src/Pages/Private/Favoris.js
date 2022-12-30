import axios from 'axios';
import gsap from 'gsap';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ModalAgents from '../../Composant/ModalAgents';
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

    const [AgentClicked, setAgentClicked] = useState({
        pseudo: "",
        imageLink: "",
        description: "",
        uuid: "",
        isClicked: false,
        isFavoris: true
    });

    const closeModal = () => {
        setAgentClicked({ ...AgentClicked, isClicked: false });

    };


    return (
        <div >
            {AgentClicked.isClicked && (
                <ModalAgents setFavorisState={setFavorisState} agentInfo={AgentClicked} close={closeModal} />
            )}
            <h2>Favoris</h2>
            <div>
                {AgentFavoris[0] ?
                    <div className="Agents ">
                        <> {AgentFavoris.map((agent, key) => {
                            return (
                                <div
                                    className="Agent animate"
                                    onClick={() => {
                                        setAgentClicked({
                                            ...AgentClicked,
                                            pseudo: agent.pseudo,
                                            imageLink: agent.imageLink,
                                            description: agent.description,
                                            isClicked: true,
                                            uuid: agent.uuid,
                                            isFavoris: true
                                        });
                                    }}
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