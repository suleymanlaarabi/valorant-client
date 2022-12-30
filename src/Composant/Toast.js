import gsap from 'gsap';
import React from 'react';
import "./css/Toast.css"
const Toast = (props) => {
    if (props.notify.isTrue) {
        gsap.to(".Toast", { opacity: 1, duration: 0.4, x: 360 })
        window.setTimeout(() => {
            gsap.to(".Toast", { opacity: 1, duration: 0.4, x: -380 })
            props.setNotify({
                isTrue: false
            })
        }, 3000)

    }


    return (
        <div className='Toast'>
            {props.notify.text}
        </div>
    );
};

export default Toast;