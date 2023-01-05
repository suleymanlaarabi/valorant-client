import { signOut } from 'firebase/auth';
import gsap from 'gsap';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { auth } from '../../firebase-config';
import { AllLangage } from '../../LangageConfig';
import "../css/Profil.css"


const Profil = () => {
    const { currentUser, updateProfilePseudo, setNotify, updateEmailUser, Langage, setLangage } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        gsap
            .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100 })


    }, [])
    const handleFormPseudo = async (e) => {
        e.preventDefault()

        try {
            await updateProfilePseudo(inputs.current[0].value)
            setNotify({
                isTrue: true,
                text: "Pseudo Mise a jour"
            })

        } catch (err) {
            console.log(err)
        }

    }
    const handleFormEmail = async (e) => {
        e.preventDefault()

        try {
            const cred = await updateEmailUser(inputs.current[1].value)

            setNotify({
                isTrue: true,
                text: cred
            })

        } catch (err) {

            setNotify({
                isTrue: true,
                text: JSON.stringify(err)
            })
        }

    }

    const inputs = useRef([])

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }
    const logOut = async () => {

        try {
            await signOut(auth)
            navigate("/")
        } catch (err) {
            alert("Impossible de vous deconnecter")
        }
    }
    return (
        <div className='Profil'>
            <h2>Profil</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <label htmlFor="pseudo">Pseudo</label>
                <div className='InputProfil'>
                    <input ref={addInputs} type="text" placeholder='Pseudo' name='pseudo' id='pseudo' defaultValue={currentUser.displayName} />
                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={handleFormPseudo} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{Langage.Profil.updateButton}</span>
                        </span>
                    </button>
                </div>

                <label htmlFor="email">Email</label>
                <div className='InputProfil'>
                    <input ref={addInputs} type="text" placeholder='email' name='email' id='email' defaultValue={currentUser.email} />

                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={handleFormEmail} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{Langage.Profil.updateButton}</span>
                        </span>
                    </button>
                </div>
                <label htmlFor="email">Langue</label>


                <div className='InputProfil LangButton'>
                    <button id='showDivLangButto' style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { document.getElementById("setLangButton").style.display = "block"; document.getElementById("showDivLangButto").style.display = "none" }} className="btn btn--light ,">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{Langage.Profil.showButtonLang}</span>
                        </span>
                    </button>
                    <div id='setLangButton'>
                        <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { localStorage.setItem("lang", "fr-FR"); setLangage(AllLangage.fr); document.getElementById("setLangButton").style.display = "none"; document.getElementById("showDivLangButto").style.display = "block" }} className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Francais</span>
                            </span>
                        </button>
                        <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { localStorage.setItem("lang", "en-US "); setLangage(AllLangage.en); document.getElementById("setLangButton").style.display = "none"; document.getElementById("showDivLangButto").style.display = "block" }} className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">English</span>
                            </span>
                        </button>
                        <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { localStorage.setItem("lang", "es-ES "); setLangage(AllLangage.es); document.getElementById("setLangButton").style.display = "none"; document.getElementById("showDivLangButto").style.display = "block" }} className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Español</span>
                            </span>
                        </button>
                    </div>





                </div>


                <div style={{ marginTop: 10 }} className="animate buttonAnim button">

                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={logOut} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{Langage.Profil.logOutButton}</span>
                        </span>
                    </button>
                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => { navigate("/private/favoris") }} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{Langage.Profil.FavorisButton}</span>
                        </span>
                    </button>

                </div>
            </form>
        </div>
    );
};

export default Profil;