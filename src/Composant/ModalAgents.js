import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import "./css/ModalAgents.css"
const ModalAgents = (props) => {

    useEffect(() => {

        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.5 })

    }, [])
    return (
        <>
            <div onClick={props.close} className='BackgroundModal'>

            </div>
            <div className='Modal'>
                <h1 className='animate' >{props.agentInfo.pseudo}</h1>
                <img className='animate' src={props.agentInfo.imageLink} />
                <p className='animate' >{props.agentInfo.description}</p>
                <div className='ModalCloseButton animate' onClick={props.close}>
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

export default ModalAgents;