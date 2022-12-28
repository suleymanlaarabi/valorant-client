import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/AgentInfo.css"
const AgentInfo = () => {
    let { uuid } = useParams();
    const [AgentInfo, setAgentInfo] = useState({
        pseudo: "",
        imageLink: "",
        description: "",
        developerName: "",
        abilities: [],
        role: "",
        roleDescription: ""

    })

    useEffect(() => {

        axios.get("https://valorant-api.com/v1/agents/" + uuid + "?language=fr-FR").then((res) => {
            var data = res.data.data
            setAgentInfo({
                pseudo: data.displayName,
                imageLink: data.fullPortraitV2,
                description: data.description,
                developerName: data.developerName,
                abilities: data.abilities,
                role: data.role.displayName,
                roleDescription: data.role.description

            })
        })
    }, [])

    useLayoutEffect(() => {
        gsap.to(".animateAgentInfo", { opacity: 1, duration: 0.4, stagger: 0.3, })

    }, [AgentInfo])

    return (
        <div className='AgentInfo'>
            <h2 className='animateAgentInfo' >Agent Info</h2 >
            <h3 className='animateAgentInfo'>{AgentInfo.pseudo}</h3>
            <img className='AgentImage animateAgentInfo' src={AgentInfo.imageLink} alt="Aucune Image" />
            <p className='animateAgentInfo'>{AgentInfo.description}</p>

            <h4 className='animateAgentInfo'>Nom du Developpeur : {AgentInfo.developerName}</h4>
            <h4 className='animateAgentInfo'>Capacité : {AgentInfo.abilities.map((abilities, key) => {
                return <span key={key}>{abilities.displayName} , </span>
            })}</h4>
            <h4 className='animateAgentInfo'>Role : {AgentInfo.role}</h4>
            <h4 className='animateAgentInfo'>Description du Role : {AgentInfo.roleDescription}</h4>


        </div>
    );
};

export default AgentInfo;