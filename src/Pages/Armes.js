import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalArmes from '../Composant/ModalArmes';
import "./css/Armes.css"
const Armes = () => {
    const [ArmesInfo, setArmesInfo] = useState([])

    useEffect(() => {
        setArmesInfo([])
        axios.get('https://valorant-api.com/v1/weapons').then(res => {
            res.data.data.map((data) => {
                console.log(data)
                setArmesInfo(current => [...current, {
                    pseudo: data.displayName,
                    armeState: data.weaponStats,
                    imageLink: data.displayIcon
                }])
            })
            console.log(res)
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
    return (
        <div>
            {ArmeClicked.isClicked &&
                <ModalArmes armeInfo={ArmeClicked} close={closeModal} />}

            <h1>Armes</h1>
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
                    }} className='Arme' key={key}>
                        <h2>{arme.pseudo}</h2>
                        <img className='imgArme' src={arme.imageLink} />
                    </div>)
                })}
            </div>
        </div>

    );
};

export default Armes;