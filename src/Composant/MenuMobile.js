import React from 'react';
import "./css/MenuMobile.css"
import NavLinkButton from './NavLinkButton';
const MenuMobile = (props) => {
    return (
        <>

            <div className='MenuMobile'>
                <NavLinkButton close={props.close} />
                <button onClick={() => {
                    props.setModal({
                        SignIn: false,
                        SignUp: true
                    })
                }} className="btn btn--light">
                    <span className="btn__inner">
                        <span className="btn__slide"></span>
                        <span className="btn__content">S'inscrire</span>
                    </span>
                </button>
                <button onClick={() => {
                    props.setModal({
                        SignIn: true,
                        SignUp: false
                    })
                }} className="btn btn--light">
                    <span className="btn__inner">
                        <span className="btn__slide"></span>
                        <span className="btn__content">Se Connecter</span>
                    </span>
                </button>
            </div>
        </>

    );
};

export default MenuMobile;