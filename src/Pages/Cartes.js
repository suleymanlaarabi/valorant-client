import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalCartes from '../Composant/ModalCartes';
import "./css/Cartes.css"
const Cartes = () => {
    const [CarteInfo, setCarteInfo] = useState([])
    useEffect(() => {
        setCarteInfo([])
        axios.get('https://valorant-api.com/v1/maps').then(res => {
            res.data.data.map((data) => {
                console.log(data)
                setCarteInfo(current => [...current, {
                    pseudo: data.displayName,
                    imageLink: data.splash,
                    mapImageLink: data.displayIcon
                }])
            })
            console.log(res)
        })
    }, [])

    const [CarteClicked, setCarteClicked] = useState({
        pseudo: "",
        imageLink: "",


        isClicked: false
    })

    const closeModal = () => {
        setCarteClicked({ ...CarteClicked, isClicked: false })
    }
    return (
        <div>

            {CarteClicked.isClicked &&
                <ModalCartes carteInfo={CarteClicked} close={closeModal} />}

            <h1>Cartes</h1>
            <div className='Cartes'>
                {CarteInfo.map((carte, key) => {
                    return (<div onClick={() => {
                        setCarteClicked({
                            ...CarteClicked,
                            pseudo: carte.pseudo,
                            imageLink: carte.mapImageLink,

                            isClicked: true

                        })
                    }} className='Carte' key={key}>
                        <h2>{carte.pseudo}</h2>
                        <img src={carte.imageLink} />
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Cartes;