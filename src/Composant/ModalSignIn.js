import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import "./css/ModalSignIn.css";
const ModalSignIn = (props) => {
    const { signIn } = useContext(UserContext)
    const navigate = useNavigate()
    const [Validation, setValidation] = useState("")


    const inputs = useRef([])
    const formRef = useRef()
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const handleForm = async (e) => {
        e.preventDefault()

        try {
            const cred = await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset()
            setValidation("")
            navigate("/private/profil")

            props.close()

        } catch {
            setValidation("Email ou mot de passe incorect")
        }

    }


    useEffect(() => {
        gsap.to(".animate", { opacity: 1, duration: 0.5, stagger: 0.3 });
    }, []);
    const closeModal = () => {
        gsap
            .to(".Modal", { opacity: 0, duration: 0.3, y: 200, x: 200, scale: 0.6 })
            .then(() => {
                props.close();
            });
        gsap.to(".BackgroundModal", { opacity: 0, duration: 0.3 });
    };
    return (
        <>
            <div onClick={closeModal} className="BackgroundModal"></div>
            <div className="Modal">
                <h2>Se connecter</h2>
                <form ref={formRef}
                    onSubmit={handleForm}>
                    <input ref={addInputs} type="text" name="" placeholder="email" id="" />
                    <input ref={addInputs} type="password" name="" placeholder="mot de passe" id="" />
                    <div className="animate SignButtonModal">
                        <button className="btn btn--light">
                            <span className="btn__inner">
                                <span className="btn__slide"></span>
                                <span className="btn__content">Se connecter</span>
                            </span>
                        </button>
                    </div>


                </form>
            </div >
        </>
    );
};

export default ModalSignIn;
