import axios from "axios";
import gsap from "gsap";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ModalCartes from "../Composant/ModalCartes";
import { UserContext } from "../Context/userContext";
import "./css/Cartes.css";

const Cartes = () => {
    const { Langage } = useContext(UserContext)

    const [CarteInfo, setCarteInfo] = useState([
        {
            pseudo: "",
            imageLink: "",
            mapImageLink: "",
            regions: [],
        },
    ]);
    useEffect(() => {
        setCarteInfo([]);
        axios.get("https://valorant-api.com/v1/maps?language=" + Langage.name).then((res) => {
            res.data.data.map((data) => {
                setCarteInfo((current) => [
                    ...current,
                    {
                        pseudo: data.displayName,
                        imageLink: data.splash,
                        mapImageLink: data.displayIcon,
                        regions: data.callouts,
                    },
                ]);
                return 0
            });
            console.log(res.data);
        });
    }, []);

    const [CarteClicked, setCarteClicked] = useState({
        pseudo: "",
        imageLink: "",
        regions: [],

        isClicked: false,
    });

    const closeModal = () => {
        setCarteClicked({ ...CarteClicked, isClicked: false });
    };

    useLayoutEffect(() => {
        gsap
            .to(".title", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })
            .then(() => {
                gsap.to(".animate", {
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.3,
                    y: 100,
                });
            });
    }, [CarteInfo]);

    return (
        <div>
            {CarteClicked.isClicked && (
                <ModalCartes carteInfo={CarteClicked} close={closeModal} />
            )}

            <h2 className="title">{Langage.Cartes.title}</h2>
            <div className="Cartes">
                {CarteInfo.map((carte, key) => {
                    return (
                        <div
                            onClick={() => {
                                setCarteClicked({
                                    ...CarteClicked,
                                    pseudo: carte.pseudo,
                                    imageLink: carte.mapImageLink,
                                    regions: carte.regions
                                        ? carte.regions
                                        : [
                                            {
                                                regionName:
                                                    "Aucune Regions Enregistrer Revenez plus tard",
                                            },
                                        ],
                                    isClicked: true,
                                });
                            }}
                            className="Carte animate"
                            key={key}
                        >
                            <h2>{carte.pseudo}</h2>
                            <img src={carte.imageLink} alt="Comming soon" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cartes;
