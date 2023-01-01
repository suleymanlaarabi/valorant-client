import gsap from "gsap";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "./css/ModalAgents.css";
const ModalAgents = (props) => {
    const { addFavoris, setNotify, removeFavoris, currentUser, getFavoris } = useContext(UserContext)

    const closeModal = () => {
        gsap
            .to(".Modal", { opacity: 0, duration: 0.3, y: 200, x: 200, scale: 0.6 })
            .then(() => {
                props.close();
            });
        gsap.to(".BackgroundModal", { opacity: 0, duration: 0.3 });
    };
    const navigate = useNavigate();

    const [AgentFavoris, setAgentFavoris] = useState([])
    const [IsFavoris, setIsFavoris] = useState(false)

    const setFavorisState = async () => {

        const Fav = await getFavoris()
        var Favoris = []
        Fav.map((e) => {

            Favoris.push(e.pseudo)
        })
        setAgentFavoris(Favoris)


    }

    useEffect(() => {
        gsap.to(".animateAgentInfo", { opacity: 1, duration: 0.25, top: 100 });

        if (AgentFavoris.includes(props.agentInfo.pseudo)) {
            console.log("yes")
            setIsFavoris(true)

        } else {
            console.log("no")
            setIsFavoris(false)

        }

    }, [AgentFavoris]);

    const addFavorisAgent = async () => {
        try {
            await addFavoris(props.agentInfo.pseudo, props.agentInfo.description, props.agentInfo.imageLink, props.agentInfo.uuid)
            setNotify({
                isTrue: true,
                text: "Ajouter aux favoris"
            })
            closeModal()
        } catch (err) {
            console.log(err)
        }
    }
    const removeFavorisAgent = async () => {
        try {
            await removeFavoris(props.agentInfo.uuid)
            setNotify({
                isTrue: true,
                text: "Supprimer des favoris"
            })
            if (props.setFavorisState) {
                props.setFavorisState()
            }

            closeModal()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setFavorisState()
    }, []);
    useEffect(() => {

        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.15 });
    }, [IsFavoris]);
    return (
        <>
            <div onClick={closeModal} className="BackgroundModal"></div>
            <div className="Modal">
                <h1 className="animate">{props.agentInfo.pseudo}</h1>
                <img alt="Comming Soon" className="animate" src={props.agentInfo.imageLink} />
                <p className="animate">{props.agentInfo.description}</p>
                <div className="Buttons">
                    <div className="ModalCloseButton animate" onClick={closeModal}>
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Fermer</span>
                            </span>
                        </button>
                    </div>
                    <div
                        className="ModalCloseButton animate"
                        onClick={() => {
                            navigate("/AgentInfo/" + props.agentInfo.uuid);
                        }}
                    >
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Plus d'info</span>
                            </span>
                        </button>

                    </div>
                    {currentUser &&
                        <>{!IsFavoris ? <>{!props.agentInfo.isFavoris && <div
                            className="ModalCloseButton animate"
                            onClick={addFavorisAgent}
                        >
                            <button className="btn btn--light">
                                <span className="btn__inner">
                                    <span className="btn__slide"></span>
                                    <span className="btn__content">mettre en favoris</span>
                                </span>
                            </button>

                        </div>}</> : <>
                            <div
                                className="ModalCloseButton animate"
                                onClick={removeFavorisAgent}
                            >
                                <button className="btn btn--light">
                                    <span className="btn__inner">
                                        <span className="btn__slide"></span>
                                        <span className="btn__content">supprimer des favoris</span>
                                    </span>
                                </button>

                            </div></>}

                        </>}



                </div>
            </div>
        </>
    );
};

export default ModalAgents;
