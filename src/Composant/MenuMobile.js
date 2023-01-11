import React from 'react';
import "./css/MenuMobile.css"
import NavLinkButton from './NavLinkButton';
const MenuMobile = (props) => {
    return (
        <>

            <div className='MenuMobile'>
                <NavLinkButton close={props.close} />
            </div>
        </>

    );
};

export default MenuMobile;