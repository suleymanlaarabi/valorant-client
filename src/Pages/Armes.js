import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ModalArmes from '../Composant/ModalArmes';
import "./css/Armes.css"
const Armes = () => {
    const [ArmesInfo, setArmesInfo] = useState([])

    useEffect(() => {
        setArmesInfo([])
        axios.get('https://valorant-api.com/v1/weapons').then(res => {
            res.data.data.map((data) => {
                setArmesInfo(current => [...current, {
                    pseudo: data.displayName,
                    armeState: data.weaponStats,
                    imageLink: data.displayIcon
                }])

            })
        })
    }, [])



    const [ArmeClicked, setArmeClicked] = useState({
        pseudo: "",
        imageLink: "",
        armeState: "",

        isClicked: false
    })

    const closeModal = () => {
        setArmeClicked({ ...ArmeClicked, isClicked: false })
    }
    useLayoutEffect(() => {
        gsap.to(".title", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 }).then(() => {
            gsap.to(".animate", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })

        })
    }, [ArmesInfo])
    return (
        <div>
            {ArmeClicked.isClicked &&
                <ModalArmes armeInfo={ArmeClicked} close={closeModal} />}

            <h2 className='title'>Armes</h2>
            <div className='Armes'>

                {ArmesInfo.map((arme, key) => {
                    return (<div onClick={() => {
                        setArmeClicked({
                            ...ArmeClicked,
                            pseudo: arme.pseudo,
                            imageLink: arme.imageLink,
                            armeState: arme.armeState,
                            isClicked: true

                        })
                    }} className='Arme animate' key={key}>
                        <h2>{arme.pseudo}</h2>
                        <img className='imgArme' src={arme.imageLink} />
                    </div>)
                })}
            </div>
        </div>

    );
};

export default Armes;