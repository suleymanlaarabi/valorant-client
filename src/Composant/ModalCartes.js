import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "./css/ModalCartes.css";
const ModalCartes = (props) => {
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
    return (
        <>
            <div onClick={closeModal} className="BackgroundModal"></div>
            <div className="Modal">
                <h1 className="animate">{props.carteInfo.pseudo}</h1>
                <img className="animate" src={props.carteInfo.imageLink} />

                <h3>Regions</h3>
                <div className="Regions">
                    {" "}
                    {props.carteInfo.regions.map((res, key) => {
                        return <h5 key={key}> {res.regionName}, </h5>;
                    })}
                </div>
                <div className="ModalCloseButton animate" onClick={closeModal}>
                    <button className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">Fermer</span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModalCartes;
