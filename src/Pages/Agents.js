import axios from 'axios';
import gsap from 'gsap';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ModalAgents from '../Composant/ModalAgents';
import "./css/Agents.css"
const Agents = () => {
    const [AgentInfo, setAgentInfo] = useState([])
    useEffect(() => {

        setAgentInfo([])
        axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').then(res => {
            res.data.data.map((data) => {
                setAgentInfo(current => [...current, {
                    pseudo: data.displayName,
                    description: data.description,
                    imageLink: data.fullPortraitV2
                }])


            })

            console.log(res)

        })




    }, [])


    useLayoutEffect(() => {
        gsap.to(".animate", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })
    }, [AgentInfo])

    const [AgentClicked, setAgentClicked] = useState({
        pseudo: "",
        imageLink: "",
        description: "",

        isClicked: false
    })

    const closeModal = () => {
        setAgentClicked({ ...AgentClicked, isClicked: false })
    }


    const gsapAnim = () => {
        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.5, y: 30 })

    }


    return (
        <div className='AgentsPage'>
            {AgentClicked.isClicked &&
                <ModalAgents agentInfo={AgentClicked} close={closeModal} />}

            <h2 className='title'>Agents</h2>

            <div className='Agents '>
                {AgentInfo.map((agent, key) => {

                    return (<div className='Agent animate' onClick={() => {
                        setAgentClicked({
                            ...AgentClicked,
                            pseudo: agent.pseudo,
                            imageLink: agent.imageLink,
                            description: agent.description,
                            isClicked: true

                        })
                    }} key={key}>
                        <h2>{agent.pseudo}</h2>
                        <img src={agent.imageLink} />

                    </div>)


                })}
            </div>




        </div>
    );
};

export default Agents;