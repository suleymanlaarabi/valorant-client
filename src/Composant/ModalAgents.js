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
            </div>
        </>
    );
};

export default ModalAgents;