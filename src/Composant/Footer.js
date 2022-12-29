import React from 'react';
import "./css/Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
    return (
        <footer className='footer'>
            <h3>Copyright © Suleyman Laarabi 2022</h3>
            <br />
            <GitHubIcon className='iconFooter' sx={{ fontSize: 50 }} />
        </footer>
    );
};

export default Footer;