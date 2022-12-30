import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "./css/ModalSignUp.css";
const ModalSignUp = (props) => {
    const navigate = useNavigate()
    const [Validation, setValidation] = useState("")
    const { signUp } = useContext(UserContext)
    useEffect(() => {
        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.3 });
    }, []);
    const closeModal = () => {
        setValidation("")
        gsap
            .to(".Modal", { opacity: 0, duration: 0.3, y: 200, x: 200, scale: 0.6 })
            .then(() => {
                props.close();
            });
        gsap.to(".BackgroundModal", { opacity: 0, duration: 0.3 });
    };
    const inputs = useRef([])
    const formRef = useRef()
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const handleForm = async (e) => {
        e.preventDefault()
        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation("6 charactere min")
            return;
        } else if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation("les mot de passe ne coresponde pas")
            return;
        } else {
            try {
                const cred = await signUp(
                    inputs.current[0].value,
                    inputs.current[1].value
                )
                formRef.current.reset()
                setValidation("")
                navigate("/private/profil")

                props.close()

            } catch (err) {
                if (err.code === "auth/invalid-email") {
                    setValidation("Email Deja utiliser")
                } else if (err.code === "auth/email-already-in-use") {
                    setValidation("Email Deja utiliser")
                } else {
                    setValidation(err.code)
                }
            }
        }
    }
    return (
        <>
            <div onClick={closeModal} className="BackgroundModal"></div>
            <div className="Modal">
                <h2>S'inscrire</h2>
                <form ref={formRef} onSubmit={handleForm}>
                    <input ref={addInputs} type="text" name="" placeholder="email" id="" />
                    <input ref={addInputs} type="password" name="" placeholder="mot de passe" id="" />
                    <input ref={addInputs} type="password" name="" placeholder="repeter le mot de passe" id="" />

                    <div className="animate SignButtonModal">
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">S'inscrire</span>
                            </span>
                        </button>
                    </div>
                    <h4 style={{ color: "red" }}>{Validation}</h4>

                </form>
            </div>
        </>
    );
};

export default ModalSignUp;
