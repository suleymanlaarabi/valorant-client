import gsap from "gsap";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "./css/ModalAgents.css";
const ModalAgents = (props) => {
    const { addFavoris, setNotify } = useContext(UserContext)
    useEffect(() => {
        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.3 });
    }, []);
    const closeModal = () => {
        gsap
            .to(".Modal", { opacity: 0, duration: 0.3, y: 200, x: 200, scale: 0.6 })
            .then(() => {
                props.close();
            });
        gsap.to(".BackgroundModal", { opacity: 0, duration: 0.3 });
    };
    const navigate = useNavigate();
    const addFavorisAgent = async () => {
        try {
            await addFavoris(props.agentInfo.pseudo, props.agentInfo.description, props.agentInfo.imageLink)
            setNotify({
                isTrue: true,
                text: "Ajouter aux favoris"
            })
        } catch (err) {
            console.log(err)
        }
    }
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
                    <div
                        className="ModalCloseButton animate"
                        onClick={addFavorisAgent}
                    >
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">mettre en favoris</span>
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAgents;
