import axios from "axios";
import gsap from "gsap";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "./css/AgentInfo.css";
const AgentInfo = () => {
    const { addFavoris, setNotify, currentUser, getFavoris, removeFavoris, Langage } = useContext(UserContext)
    const [AgentFavoris, setAgentFavoris] = useState([])
    const [IsFavoris, setIsFavoris] = useState(false)
    let { uuid } = useParams();
    const [AgentInfo, setAgentInfo] = useState({
        pseudo: "",
        imageLink: "",
        description: "",
        developerName: "",
        abilities: [],
        role: "",
        roleDescription: "",
    });
    const setFavorisState = async () => {

        const Fav = await getFavoris()
        var Favoris = []
        Fav.map((e) => {

            Favoris.push(e.pseudo)
        })
        setAgentFavoris(Favoris)


    }
    const removeFavorisAgent = async () => {
        try {
            await removeFavoris(uuid)
            setNotify({
                isTrue: true,
                text: "Supprimer des favoris"
            })
            setIsFavoris(false)
            gsap.to(".animateAgentInfo", { opacity: 1, duration: 0.25, top: 100 });


        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        setFavorisState()
        axios
            .get("https://valorant-api.com/v1/agents/" + uuid + "?language=" + Langage.name)
            .then((res) => {
                var data = res.data.data;
                setAgentInfo({
                    pseudo: data.displayName,
                    imageLink: data.fullPortraitV2,
                    description: data.description,
                    developerName: data.developerName,
                    abilities: data.abilities,
                    role: data.role.displayName,
                    roleDescription: data.role.description,
                });
            });
    }, [uuid]);

    useEffect(() => {
        gsap.to(".animateAgentInfo", { opacity: 1, duration: 0.25, stagger: 0.2, top: 100 }).then(() => {
            if (AgentFavoris.includes(AgentInfo.pseudo)) {

                setIsFavoris(true)
            } else {

                setIsFavoris(false)
            }

        })


    }, [AgentInfo, AgentFavoris]);
    useEffect(() => {
        gsap.to(".animateFavorisButton", { opacity: 1, duration: 0.25, top: 100 })

    }, [IsFavoris])




    const addFavorisAgent = async () => {

        try {
            await addFavoris(AgentInfo.pseudo, AgentInfo.description, AgentInfo.imageLink, uuid)
            setNotify({
                isTrue: true,
                text: "Ajouter aux favoris"
            })
            setIsFavoris(true)
            gsap.to(".animateAgentInfo", { opacity: 1, duration: 0.25, top: 100 });

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="AgentInfo">
            <h2 className="animateAgentInfo">Agent Info</h2>
            <h3 className="animateAgentInfo">{AgentInfo.pseudo}</h3>
            <img
                className="AgentImage animateAgentInfo"
                src={AgentInfo.imageLink}
                alt="Comming Soon"
            />
            <p className="animateAgentInfo">{AgentInfo.description}</p>

            <h4 className="animateAgentInfo">
                Nom du Developpeur : {AgentInfo.developerName}
            </h4>
            <h4 className="animateAgentInfo">
                Capacité :{" "}
                {AgentInfo.abilities.map((abilities, key) => {
                    return <span key={key}>{abilities.displayName} , </span>;
                })}
            </h4>
            <h4 className="animateAgentInfo">Role : {AgentInfo.role}</h4>
            <h4 className="animateAgentInfo">
                Description du Role : {AgentInfo.roleDescription}
            </h4>
            {IsFavoris && <div
                className="animateAgentInfo animateFavorisButton"
                onClick={removeFavorisAgent}

            >
                <button className="btn btn--light">
                    <span className="btn__inner">
                        <span className="btn__slide"></span>
                        <span className="btn__content">Supprimer des favoris</span>
                    </span>
                </button>

            </div>}
            {!IsFavoris && <> {currentUser && <div
                className="animateAgentInfo animateFavorisButton"
                onClick={addFavorisAgent}

            >
                <button className="btn btn--light">
                    <span className="btn__inner">
                        <span className="btn__slide"></span>
                        <span className="btn__content">mettre en favoris</span>
                    </span>
                </button>

            </div>
            }</>}

        </div>
    );
};

export default AgentInfo;
