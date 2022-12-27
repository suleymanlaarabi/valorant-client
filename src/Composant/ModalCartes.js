import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import "./css/ModalCartes.css"
const ModalCartes = (props) => {


    useEffect(() => {
        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.5 })

    }, [])
    return (
        <>
            <div onClick={props.close} className='BackgroundModal'>

            </div>
            <div className='Modal'>
                <h1 className='animate'>{props.carteInfo.pseudo}</h1>
                <img className='animate' src={props.carteInfo.imageLink} />

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

export default ModalCartes;