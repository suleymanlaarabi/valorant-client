import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ModalCartes from '../Composant/ModalCartes';
import "./css/Cartes.css"
const Cartes = () => {
    const [CarteInfo, setCarteInfo] = useState([{
        pseudo: "",
        imageLink: "",
        mapImageLink: "",
        regions: []
    }])
    useEffect(() => {
        setCarteInfo([])
        axios.get('https://valorant-api.com/v1/maps?language=fr-FR').then(res => {
            res.data.data.map((data) => {
                setCarteInfo(current => [...current, {
                    pseudo: data.displayName,
                    imageLink: data.splash,
                    mapImageLink: data.displayIcon,
                    regions: data.callouts

                }])
            })
        })
    }, [])

    const [CarteClicked, setCarteClicked] = useState({
        pseudo: "",
        imageLink: "",
        regions: [],

        isClicked: false
    })

    const closeModal = () => {
        setCarteClicked({ ...CarteClicked, isClicked: false })
    }

    useLayoutEffect(() => {

        gsap.to(".title", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 }).then(() => {
            gsap.to(".animate", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })

        })
    }, [CarteInfo])

    return (
        <div>

            {CarteClicked.isClicked &&
                <ModalCartes carteInfo={CarteClicked} close={closeModal} />}

            <h2 className='title'>Cartes</h2>
            <div className='Cartes'>
                {CarteInfo.map((carte, key) => {
                    return (<div onClick={() => {
                        setCarteClicked({
                            ...CarteClicked,
                            pseudo: carte.pseudo,
                            imageLink: carte.mapImageLink,
                            regions: carte.regions,
                            isClicked: true

                        })
                    }} className='Carte animate' key={key}>
                        <h2>{carte.pseudo}</h2>
                        <img src={carte.imageLink} />
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Cartes;