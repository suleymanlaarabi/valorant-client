import React, { useEffect } from 'react';
import "./css/ModalCartes.css"
const ModalCartes = (props) => {
    useEffect(() => {
        console.log(props.carteInfo.armeState)
    }, [])
    return (
        <>
            <div onClick={props.close} className='BackgroundModal'>

            </div>
            <div className='Modal'>
                <h1>{props.carteInfo.pseudo}</h1>
                <img src={props.carteInfo.imageLink} />


            </div>
        </>
    );
};

export default ModalCartes;