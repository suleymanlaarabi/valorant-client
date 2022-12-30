import React from 'react';
import "./css/Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
    return (
        <footer className='footer'>
            <h3>Copyright © Suleyman Laarabi 2022</h3>
            <br />
            <a href="https://github.com/suleymanlaarabidev/valorant-client">
                <GitHubIcon id='iconFooter' />
            </a>

        </footer>
    );
};

export default Footer;