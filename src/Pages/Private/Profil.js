import { signOut } from 'firebase/auth';
import gsap from 'gsap';
import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { auth } from '../../firebase-config';
import "../css/Profil.css"
const Profil = () => {
    const { currentUser, updateProfilePseudo, setNotify } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        gsap
            .to(".buttonAnim", { opacity: 1, duration: 0.4, y: 100 })

        console.log(auth)
    }, [])
    const handleForm = async (e) => {
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
            <form>
                <label htmlFor="pseudo">Pseudo</label>
                <input ref={addInputs} type="text" placeholder='Pseudo' name='pseudo' id='pseudo' defaultValue={currentUser.displayName} />
                <div style={{ marginTop: 10 }} className="animate buttonAnim button">
                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={handleForm} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">Mettre a jour le profil</span>
                        </span>
                    </button>
                    <button style={{ marginLeft: 10, marginRight: 10 }} onClick={logOut} className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">Se Deconnecter</span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profil;