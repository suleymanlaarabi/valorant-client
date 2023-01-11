import gsap from "gsap";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import logo from "../assets/logo.png"
import "./css/NavBar.css";
import ModalSignIn from "./ModalSignIn";
import ModalSignUp from "./ModalSignUp";
import MenuMobile from "./MenuMobile";
import NavLinkButton from "./NavLinkButton";


const NavBar = () => {
    const { currentUser, Langage } = useContext(UserContext)
    const navigate = useNavigate()
    const [SignModal, setSignModal] = useState({
        SignIn: false,
        SignUp: false
    })
    useEffect(() => {
        console.log(Langage)
        gsap.to(".logo", { opacity: 1, duration: 0.4, y: 120 }).then(() => {
            gsap
                .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100, stagger: 0.3 })
                .then(() => {
                    gsap
                        .to(".heroBanner", { opacity: 1, duration: 0.4, y: 200 })
                        .then(() => {
                            gsap.to(".ValorantTitle", {
                                opacity: 1,
                                duration: 0.4,
                                stagger: 0.3,
                                y: 70,
                            });
                        });
                });
        });
    }, [currentUser]);



    const setModal = () => {
        setSignModal({
            SignIn: false,
            SignUp: false
        })
    }
    const [DisplayMenuMobile, setDisplayMenuMobile] = useState(false)
    const handleCloseMenuMobile = () => {
        setDisplayMenuMobile(false)
    }

    return (
        <>
            <nav>
                {SignModal.SignIn ? <ModalSignIn close={setModal} /> : null}
                {SignModal.SignUp ? <ModalSignUp close={setModal} /> : null}

                <img className="logo" src={logo} alt="" />
                <div className="LinkNav">
                    <NavLinkButton />
                </div>
                <div className="SignButton">
                    <div onClick={() => {
                        if (DisplayMenuMobile) {
                            setDisplayMenuMobile(false)
                        } else {
                            setDisplayMenuMobile(true)
                        }
                    }} className="animate buttonAnim button  ">
                        <button className="btn btn--light MenuButton ">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Menu</span>
                            </span>
                        </button>
                    </div>
                    {!currentUser && <><div onClick={() => {
                        setSignModal({
                            SignIn: true,
                            SignUp: false
                        })
                    }} className="animate buttonAnim button ButtonLike">
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Se connecter</span>
                            </span>
                        </button>
                    </div>
                        <div onClick={() => {
                            setSignModal({
                                SignIn: false,
                                SignUp: true
                            })
                        }} className="animate buttonAnim button signUpButton">
                            <button className="btn btn--light">
                                <span className="btn__inner">
                                    <span className="btn__slide"></span>
                                    <span className="btn__content">S'inscrire</span>
                                </span>
                            </button>
                        </div></>}

                    {currentUser && <>
                        <div onClick={() => { navigate("/private/profil") }} className="animate buttonAnim button ">
                            <button className="btn btn--light">
                                <span className="btn__inner">
                                    <span className="btn__slide"></span>
                                    <span className="btn__content">{Langage.NavBar.ProfilButton}</span>
                                </span>
                            </button>
                        </div>
                        <div onClick={() => {
                            navigate("/private/favoris")
                        }} className="animate buttonAnim button ButtonLike">
                            <button className="btn btn--light">
                                <span className="btn__inner">
                                    <span className="btn__slide"></span>
                                    <span className="btn__content">{Langage.NavBar.FavorisButton}</span>
                                </span>
                            </button>
                        </div>

                    </>}




                </div>


            </nav>
            {DisplayMenuMobile && <MenuMobile close={handleCloseMenuMobile} />}

        </>

    );
};

export default NavBar;
