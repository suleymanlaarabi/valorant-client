import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

    const [AgentClicked, setAgentClicked] = useState({
        pseudo: "",
        imageLink: "",
        description: "",

        isClicked: false
    })

    const closeModal = () => {
        setAgentClicked({ ...AgentClicked, isClicked: false })
    }
    return (
        <div>
            {AgentClicked.isClicked &&
                <ModalAgents agentInfo={AgentClicked} close={closeModal} />}

            <h1>Agents</h1>
            <div className='Agents'>
                {AgentInfo.map((agent, key) => {
                    return (<div onClick={() => {
                        setAgentClicked({
                            ...AgentClicked,
                            pseudo: agent.pseudo,
                            imageLink: agent.imageLink,
                            description: agent.description,
                            isClicked: true

                        })
                    }} className='Agent' key={key}>
                        <h2>{agent.pseudo}</h2>
                        <img src={agent.imageLink} />
                    </div>)
                })}
            </div>

        </div>
    );
};

export default Agents;