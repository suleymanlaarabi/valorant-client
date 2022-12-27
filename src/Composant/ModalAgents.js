import React from 'react';
import "./css/ModalAgents.css"
const ModalAgents = (props) => {
    return (
        <>
            <div onClick={props.close} className='BackgroundModal'>

            </div>
            <div className='Modal'>
                <h1>{props.agentInfo.pseudo}</h1>
                <img src={props.agentInfo.imageLink} />
                <p>{props.agentInfo.description}</p>
                <div onClick={props.close}>
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