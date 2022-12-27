import React from 'react';
import "./css/FeaturesCard.css"

const FeaturesCard = (props) => {
    return (
        <div onClick={props.onClick} className='featuresCard'>
            <h3>{props.title}</h3>
            <div className='circle'>
                {props.icon}
            </div>

            <p>{props.description}</p>


        </div>
    );
};

export default FeaturesCard;